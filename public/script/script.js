var mobile = document.querySelector("#mobile");
var ride = document.querySelector(".ride");
var reside = document.querySelector(".reside");
var rise = document.querySelector(".rise");
var aboutUs = document.querySelector("#aboutUs");
var postSection = document.querySelector("#postsSection");
var requestSection = document.querySelector("#requestSection");

const observer = new IntersectionObserver(entries =>{
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            entry.target.classList.add('visibility');
        }
    })
});

observer.observe(rise);
observer.observe(ride);
observer.observe(reside);
observer.observe(aboutUs);
observer.observe(postSection);
observer.observe(requestSection);
observer.observe(mobile);






