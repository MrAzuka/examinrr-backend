const Student = require('../models/student');
const jwt = require('jsonwebtoken');


exports.signUpUser = async (req, res) => {
    //fetch student deatils from req body
    const { firstName, lastName, matricNumber, faculty, department, level, email, password, passwordConfirm, role } = req.body;
    console.log(req.body)
    //check for existing student
    // Student.findOne = ({ matricNumber: matricNumber }, async (err, existingStudent) => {
        
        // if (err) {
        
        //     return res.status(500).json({ err })
        // }
        // if (existingStudent) {
        //     console.log(existingStudent)
        //     return res.status(400).json({ message: 'A student with this matric Number already exists' })
        // }
        // //create new student
        // else {
            const student = await Student.create({
                firstName,
                lastName,
                matricNumber,
                faculty,
                department,
                level,
                email,
                password,
                passwordConfirm,
                role
            })
            console.log(student)
            await student.save()
            res.status(201).json({
                student,
                message: "Student Created Sucessfully"
            })
            if (err) {
                console.log(err);
                let message = "";
                if (err.errors.email) message = 'email already exists.';
                success: false,
                    message
            }
            else {
                console.log('success')

                return res.status(201).json({
                    success: true,
                    message: 'Registration successful'
                })
            }
        // }
    // })
}

//STUDENT LOGIN
exports.signInUser = function (req, res) {
    const { matricNumber, password } = req.body
    Student.getStudentbymatricNumber(matricNumber, (err, Student) => {
        if (err) throw err;
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'matric Number does not exist in portal'
            })
        }
        //password compare
        Student.comparePassword(password, Student.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({
                    type: "Student",
                    data: {
                        _id: Student._id,
                        matricNumber: Student.matricNumber,
                        firstName: Student.firstName,
                        email: Student.email,
                    }


                }, config.secret, {
                    expiresIn: 604800 // for 1 week, in millisecs
                }
                );
                return res.json({
                    success: true,
                    token: "JWT" + token,
                    message: 'login successful.'
                });

            }
            else {
                return res.json({
                    success: true,
                    message: 'wrong password.'
                });
            }
        })
    })

}