const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  first_name: {
    type: String,
    maxlength: 100,
    required: true
  },
  last_name: {
    type: String,
    maxlength: 50,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  salary: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
