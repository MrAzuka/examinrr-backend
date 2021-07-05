const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const ExaminerSchema = new Schema({
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
      enum: ["nil", "Examiner"],
      default: "student"
    },
   
  });
  
  ExaminerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordConfirm = undefined;
    next();
  });
  
  ExaminerSchema.methods.passwordsMatch = async function (passwordInput, password) {
    return await bcrypt.compare(passwordInput, password);
  };
  
  module.exports = model('Examiner', ExaminerSchema);
