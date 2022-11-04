const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const showreelRoutes = require('./routes/showreel');
const realisationRoutes = require('./routes/realisation');

mongoose.connect("mongodb+srv://ngproject:gj3pFs6W9tPietJB@cluster0.7zrowa0.mongodb.net/?retryWrites=true&w=majority",
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/showreel', showreelRoutes);
app.use('/api/realisation', realisationRoutes);

module.exports = app;