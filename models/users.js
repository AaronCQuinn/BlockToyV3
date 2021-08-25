const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    hash: String,
    salt: String,
    email: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;