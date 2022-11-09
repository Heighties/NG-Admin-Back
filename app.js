const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const showreelRoutes = require('./routes/showreel');
const realisationRoutes = require('./routes/realisation');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/user');
const path = require('path');


const helmet = require('helmet');
const nocache = require('nocache');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const fs  = require('fs');
const multer = require('multer');
// const upload = multer({dest: "./images/"})

dotenv.config();


mongoose.connect("mongodb+srv://ngproject:IQUXml2sC9jUB5Ga@cluster0.7zrowa0.mongodb.net/?retryWrites=true&w=majority",
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// app.use(express.json());

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(limiter)

app.use(nocache());
app.use(cors());

app.use('/api/showreel', showreelRoutes);
app.use('/api/realisation', realisationRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;