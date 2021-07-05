//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function (req,res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/sign",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/failure",function (req,res) {
    res.redirect(__dirname + "/signup.html");  
});

app.post("/signup",function (req,res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    console.log(req.body.firstName);
    console.log(req.body.lastName);
    console.log(req.body.email);



    const data = {
        members: [
            {
                email_address :email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    };
    const url = "https://us6.api.mailchimp.com/3.0/lists/590bd6287a";
    const options = {
        method : "POST",
        auth : "Smart-dev:b9d3a2a4d9ef15b37857fefdb80a8c0e-us6"
    }

    const jsonData = JSON.stringify(data);
    const request = https.request(url,options,function (response) {

        if (response.statusCode) {
            res.sendFile(__dirname+ "/success.html");
        } else {
            res.sendFile(__dirname+ "/failure.html");
        }



        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});

app.listen(process.env.PORT || 3000,function (req,res) {
    console.log("Server is running on port 3000");
});





// API Key
// 2debd2734bde5528331c519560f12243-us6

// list ID
// 590bd6287a