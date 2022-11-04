const mongoose = require('mongoose');


const showreelSchema = mongoose.Schema({
    name: { type: String, required: true},
    videoUrl: { type: String, required: true }, 
    // picture: {type: String, required: true },
});

module.exports = mongoose.model('Sworeel', showreelSchema);