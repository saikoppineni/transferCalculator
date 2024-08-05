const bodyParser = require('body-parser');
const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();
const pg = require('pg');

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});
pool.connect((err)=>{
  if(err) console.log(err);
  else console.log('connection successful')
});

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

function sendingMail(name,email,comment){
    var site = "transferCalculator"
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
});
let mailOptions = {
    from: process.env.USER,
    to: process.env.USER,
    subject: `Name : ${name}`,
    text: `Name : ${name}\nEmail : ${email}\nComment : ${comment}\nSite : ${site}`    
};
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('Error occurred:', error);
    }
    console.log('Email sent:', info.response);
});


  pool.query('insert into visitors(name,email,comment,site) values($1,$2,$3,$4)',[name,email,comment,site], (result, err) => {
    if (err) console.log(err);
    else console.log('data updated successfully');
  })

}

app.get("/",(req,res)=>{
    res.render("index.html")
});

app.post("/sendMail",(req,res)=>{
    var {name,email,comment} = req.body;
    sendingMail(name,email,comment);
    res.redirect("/");
})

app.listen(port,(req,res)=>{
    console.log("server running on port 3000");
})