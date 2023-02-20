const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        maxlength: 100,
        required: [true, 'Please enter a user name.'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email address.'],
        unique: true,
        maxlength: 50,
        validate: {
            validator: (email) => {
                const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return emailRegex.test(email);
            },
            message: 'Please enter a valid email address.'
        }
    },
    password: {
        type: String,
        required: [true, 'Please enter a password.']
    }
});

module.exports = mongoose.model('User', userSchema);
