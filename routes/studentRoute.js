const express = require ('express');
const router = express.Router();
const {signUpUser, signInUser} = require ("../controllers/studentControl")
const Student = require ('../models/student');
const {connectDB} = require('../db/connectDB')


router.get("/", function (req, res){
   return res.json({
        message: 'THIS SHOULD BE THE homepage'
    })
})

// router.get("/signup", function (req, res){
//     res.json({
//         message: 'THIS SHOULD BE THE SIGNUP PAGE'
//     })
// })

router.post("/signup", signUpUser)

router.post("/signin", signInUser)


module.exports = router;
