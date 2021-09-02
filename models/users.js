// User schema.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    hash: String, // Required for password encryption.
    salt: String, // Required for password encryption.
    email: {
        type: String,
        required: true
    }
}, {timestamps: true}); // Included timestamps for potential expansion if uses would want to see when their account was created.

const Users = mongoose.model('Users', userSchema);
module.exports = Users;