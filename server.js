const express = require('express')
const app = express()
const {connectDB} = require('./db/connectDB')
const PORT = process.env.PORT || 4000
const bodyparser = require ("body-parser");
const Student = require ("./models/student");
const router = require ("./routes/studentRoute");
const expressSession = require('express-session',{
    secret: 'secret', 
    resave: false,
    saveUninitialized: false
  });

// Connecting DB
connectDB()

app.use(express.json());

//bodyparser
app.use(express.urlencoded({ extended:true}));

app.use(router);
app.use(Student);
app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)})