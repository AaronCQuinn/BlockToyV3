const mongoose = require('mongoose');

let MongoDB = mongoose.connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(res => {
    console.log('Connected to the database.');
}).catch(err => {
    console.log('Error connecting to the database.');
});

module.exports = MongoDB;