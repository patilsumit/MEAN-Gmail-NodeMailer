const express = require('express')
const users = express.Router()
const cors = require('cors')
require('dotenv').config();

const nodemailer = require('nodemailer');

const sendEmail = require('../Models/sendEmail')
users.use(cors())

process.env.SECRET_KEY = 'secret'


users.post('/sendemail', (req, res) => {
    const today = new Date()
    const userData = {
      sender: req.body.sender,
      subject: req.body.subject,
      description: req.body.description,
      created: today
    }
     
    
            sendEmail.create(userData)
            .then(user => {
                res.send(user);
                console.log(user)
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        

    // Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL , // TODO: your gmail account
        pass: process.env.PASSWORD    // TODO: your gmail password
    }
});

// Step 2
let mailOptions = {
    from: 'patilsumit2020@gmail.com', // TODO: email sender
    to: req.body.sender ,             // TODO: email receiver
    subject: req.body.subject,
    text: req.body.description,
    html: "<h1>" + req.body.description +"</h1>"
};

// Step 3
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        console.log('Error occurs' ,err);
    }
    else{
        console.log('Email sent!!!');
    }
    
});  
  })
  
  module.exports = users