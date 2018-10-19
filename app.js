const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const questions = require('./routes/questions')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// Mlab Mongoose setup
const dbadd = require("./_config/database/db-config").mongoURI;
mongoose.connect(dbadd);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));

//Routes
app.use('/api/v1/questions', questions)

module.exports = app
