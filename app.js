require('dotenv').config();
// Import express and express session.
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

// Import mongoose to handle connecting to the database.
const MongoDB = require('./database');
const MongoDBSession = require('connect-mongodb-session')(session);
app.use(express.json());
app.use(cookieParser());
app.use(flash());

// Route imports.
const homepageRoute = require('./routes/homepageRoute');
const highscoreRoute = require('./routes/highscoreRoute');
const loginRoute = require('./routes/loginRoute');
const registrationRoute = require('./routes/registrationRoute');

const sessionStore = new MongoDBSession({
    uri: process.env.DB_STRING,
    collection: 'Sessions'
});

app.use(
    session({
        secret: "example",
        resave: false,
        saveUninitialized: true, // This value depicits whether a session will be stored in a session store.
        store: sessionStore,
    })
);

// Route imports.
app.use(express.static('public'));
app.use(homepageRoute, highscoreRoute, loginRoute, registrationRoute);

app.listen(5000);