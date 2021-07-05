const { Schema, model } = require('mongoose');
const mongoose = require ('mongoose')
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const StudentSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First Name'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name'],
  },
  matricNumber: {
    type: String,
    unique: true,
    required: [true, 'Matric Number'],
  },
  faculty: {
    type: String,
    required: [true, 'Faculty'],
  },
  department: {
    type: String,
    required: [true, 'Department'],
  },
  level: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Enter an email'],
    validate: {
      validator: function (value) {
        return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value.toLowerCase());
      },
      message: 'Enter a valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Password'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confirm your password'],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: 'Password do not match',
    },
  },
  role: {
    type: String,
    enum: ["nil", "student"],
    default: "student"
  },
 
});

StudentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  // this.passwordConfirm = undefined;
  next();
});

StudentSchema.methods.passwordsMatch = async function (passwordInput, password) {
  return await bcrypt.compare(passwordInput, password);
};
StudentSchema.plugin(uniqueValidator);

//find student by matric Number
module.exports.getStudentbymatricNumber = function (matricNumber, callback){
  const query = {matricNumber : matricNumber}
  Student.findOne(query, callback);
}

//compare password for login
module.exports.comparePassword = function(password, hash, callback){
  bcrypt.compare(password, hash, (err, isMatch)=>{
    if (err) throw err;
    callback(null, isMatch);
  });
}

module.exports = model('Student', StudentSchema);