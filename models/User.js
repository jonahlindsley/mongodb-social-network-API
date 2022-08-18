

const { Schema, model } = require('mongoose');

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/;
    return re.test(email);
  };
  

const userSchema = new Schema({
username: {
    type: String,
    unique: true,
    required: true,
    trim: true
},
email: {
    type: String,
    unique: true,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/,
        "Please fill a valid email address",
    ],
},
thoughts: [],
friends: []

})


userSchema.virtual('friendCount')
  .get(function () {
    return `${this.friend.length}`;
  });



const User = model('User', userSchema);

module.exports = User