require('dotenv').config();
// Import express and express session.
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const session = require('express-session');
const path = require('path');

// Import mongoose to handle connecting to the database.
const MongoDB = require('./database');
const MongoDBSession = require('connect-mongodb-session')(session);
app.use(express.json());

// Route imports.
const homepageRoute = require('./routes/homepageRoute');
const highscoreRoute = require('./routes/highscoreRoute');
const loginRoute = require('./routes/loginRoute');
const registrationRoute = require('./routes/registrationRoute');

const sessionStore = new MongoDBSession({
    uri: process.env.DB_STRING,
    collection: 'Sessions'
})

app.use(
    session({
        secret: "example",
        resave: false,
        saveUninitialized: true, // This value depicits whether a session will be stored in a session store.
        store: sessionStore,
    })
);

app.listen(5000, console.log("Server running on port 5000."));

// Route imports.
app.use(express.static('public'));
app.use(homepageRoute, highscoreRoute, loginRoute, registrationRoute);

/* TODO:
1. Explore bootstrap for front end.
2. Add home links to login and register page.
4. UI reflects login username on pages (use EJS)
5. Order database by completion time.
*/