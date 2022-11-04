const mongoose = require('mongoose');


const realisationSchema = mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    videoUrl: { type: String, required: true }, 
    picture: {type: String, required: true },
});

module.exports = mongoose.model('Realisation', realisationSchema);