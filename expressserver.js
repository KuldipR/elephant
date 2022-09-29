const { application } = require("express");
const express = require("express");
const fs = require("fs");
const path = require('path');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
const { stringify } = require("querystring");
const mongodb = require("mongodb");
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/mongo');
    console.log("connected");

}




const app = express();
const port = 8080;

const home = fs.readFileSync('index.html');
const about = fs.readFileSync('about.html');
const serv = fs.readFileSync('services.html');
const cont = fs.readFileSync('contact.html');
const elephant = fs.readFileSync('elephant.html');

// app.get('/index.js',function(req,res){
//     res.sendFile(path.join(__dirname + '/index.html')); 
//  });


app.use('/static', express.static('public'));
app.use(express.urlencoded());






app.get("/home", (req, res) => {

    res.end(home);
});

app.get("/elephant", (req, res) => {

    res.end(elephant);
});

app.get("/about", (req, res) => {

    res.end(about);
});

app.post("/about", (req, res) => {
    res.send("THis is  POst response");

});

app.get("/contact", (req, res) => {

    res.end(cont);
});

app.get("/services", (req, res) => {

    res.end(serv);
});


const contactschema = new mongoose.Schema({
    name: String,
    surname: String,
    city: String,
    num: Number
})

var newcontact = mongoose.model('newcontact', contactschema);


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.post("/elephant", (req, res) => {



    var myData = new newcontact(req.body);

    console.log(typeof myData);
    console.log(myData);



    myData.save().then(() => {
        res.send("Form saved");
        console.log(myData);
    }).catch(() => {
        res.status(400).send("form is NOT saved");


    })
});

const contactschema1 = new mongoose.Schema({
    name: String,
    sname: String,
    number: Number,
    email: String
    
})

app.post("/contact", (req, res) => {



    var myData1 = new newcontact(req.body);

    console.log(typeof myData1);
    console.log(myData1);



    myData1.save().then(() => {
        res.send("Form saved");
        console.log(myData1);
    }).catch(() => {
        res.status(400).send("form is NOT saved");


    })
});

app.listen(port, () => {

    console.log(`Server started at ${port}`);
})

