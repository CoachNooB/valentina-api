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
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'admin',
        password: 'admin',
        database: 'valentina'
    }
});

//App Dependencies
const app = express();
app.use(bodyParser.json());
app.use(cors());

//Back End Point
app.get('/', (req, res) => { res.send(database.users) })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) }) 
app.put('/image', (req, res) => { image.handleImage(req, res, db) })

//Backend Port
app.listen(3001, () => {
    console.log('App is running on port 3001');
})