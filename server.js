//Dependencies Library
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

//Controllers Module
const signin = require('./controllers/signin.js');
const register = require('./controllers/register.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

//Database Connection
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});

//App Dependencies
const app = express();
app.use(bodyParser.json());
app.use(cors());

//Back End Point
app.get('/', (req, res) => { res.send('It is Working') })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) }) 
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

//Backend Port
const listenPort = process.env.PORT;

app.listen(listenPort, () => {
    console.log(`App is running on port ${listenPort}`);
})