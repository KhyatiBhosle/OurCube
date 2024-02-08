var posts = document.querySelectorAll(".post");
var what = document.getElementById('what');

const observer = new IntersectionObserver(entries =>{
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            entry.target.classList.add('visibility');
        }
        if(!entry.isIntersecting){
            entry.target.classList.remove('visibility');
        }
    })
});

if(posts){
    posts.forEach((post) => {
        observer.observe(post);
    });
}

posts.forEach((post, index) => {
    post.style.transitionDelay = `${index*0.3}s`;
});

if(what.innerHTML == "accomodation"){
    document.getElementById('accomodation').selected = true;
}

if(what.innerHTML == "job"){
    document.getElementById('job').selected = true;
}

if(what.innerHTML == "ride"){
    document.getElementById('ride').selected = true;
}

