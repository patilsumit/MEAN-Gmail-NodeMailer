var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose')
var port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

const mongoURI = 'mongodb://localhost:27017/Gmail'

mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true }  
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

var Users = require('./Routes/Users')
var SendEmail=require('./Routes/sendEmails');

app.use('/users', Users)
app.use('/users',SendEmail)

// app.use(express.static('dist/LibraryManagementSystem'));

app.use('/testing',(req,res)=>{
    console.log('Testing Done Library')
    res.write('Testing Done');
    res.end();
})

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})