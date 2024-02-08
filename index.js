import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://khyatibhosle:OurCube@ourcube.m8hm3ds.mongodb.net/");

const jobSchema = new mongoose.Schema({
    type: String,
    name: String,
    email: String,
    phone: String,
    location: String,
    salary: String,
    info: String,
    datePosted: String,
    what: String
});

const accomodationSchema = new mongoose.Schema({
    type: String,
    name: String,
    email: String,
    phone: String,
    location: String,
    rent: String,
    info: String,
    datePosted: String,
    what: String
});

const rideSchema = new mongoose.Schema({
    type: String,
    name: String,
    email: String,
    phone: String,
    date: String,
    time: String,
    price: String,
    from: String,
    to: String,
    info: String,
    datePosted: String,
    what: String
});

const Job = mongoose.model("Job", jobSchema);
const Accomodation = mongoose.model("Accomodation", accomodationSchema);
const Ride = mongoose.model("Ride", rideSchema);

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res)=>{
    res.render('index.ejs');
});

app.get('/accomodation', (req,res)=>{
    res.render('accomodation.ejs');
});

app.get('/ride', (req,res)=>{
    res.render('ride.ejs');
});

app.get('/jobs', (req,res)=>{
    res.render('job.ejs');
});

app.get('/allposts', (req,res)=>{
    res.render('allPosts.ejs', {request: "", posts:[]});
});



app.post('/allposts', (req,res) => {
    var query = {};
    if(req.body.typeOfRequest != ''){
        query.type = req.body.typeOfRequest;
    }

    if(req.body.area != ''){
        query.location = req.body.area
    }

    if(req.body.dateOfPosting!= ''){
        var date = new Date(req.body.dateOfPosting.replace(/-/g, '\/').replace(/T.+/, ''));
        query.datePosted = date.toDateString()
    }

    if(req.body.request === 'accomodation'){
        Accomodation.find(query).then((allAccomodations) => {
            res.render('allPosts.ejs', {posts: allAccomodations});
        });
    }
    else if(req.body.request === 'job'){
        Job.find(query).then((alljobs) => {
            res.render('allPosts.ejs', {posts: alljobs});
        });
    }
    else if(req.body.request === 'ride'){
        Ride.find(query).then((allrides) => {
            res.render('allPosts.ejs', {posts: allrides});
        });
    }
    else{
        res.render('allPosts.ejs', {request: "", posts:[]});
    }
});

app.post('/accomodation', (req, res)=>{
    var today = new Date().toDateString();
    var accomodation = new Accomodation({
        type: req.body.type,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        location: req.body.area,
        rent: req.body.rent,
        info: req.body.info,
        datePosted: today,
        what: "accomodation"
    });

    accomodation.save().then(()=>{
        Accomodation.find({}).then((allAccomodations) => {
            res.render('allPosts.ejs', {request: "accomodation", posts: allAccomodations});
         });
    }).catch((err)=>{
        console.log(err);
    });

   

});

app.post('/job', (req, res)=>{
    var today = new Date().toDateString();
    var job = new Job({
        type: req.body.type,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        location: req.body.area,
        salary: req.body.salary,
        info: req.body.info,
        datePosted: today,
        what: "job"
    });

    job.save().then(() =>{
        Job.find({}).then((alljobs) => {
            res.render('allPosts.ejs', {request: "job", posts: alljobs});
        });
    }).catch((err)=>{
        console.log(err);
    });
});

app.post('/ride', (req, res)=>{
    var date = new Date(req.body.date.replace(/-/g, '\/').replace(/T.+/, ''));
    var today = new Date().toDateString();
    var ride = new Ride({
        type: req.body.type,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        date: date.toDateString(),
        time: req.body.startTime,
        from: req.body.startLocation,
        to: req.body.destination,
        price: req.body.price,
        info: req.body.info,
        datePosted: today,
        what: "ride"
    });

    ride.save().then(()=>{
        Ride.find({}).then((allrides) => {
            res.render('allPosts.ejs', {posts: allrides});
        });
    }).catch((err)=>{
        console.log(err);
    });

    
});



app.listen(port, (err)=>{
    if(err){console.log(err)}
    else{console.log(`Server listening on port ${port}`)}
});