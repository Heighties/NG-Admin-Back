const mongoose = require('mongoose');


const infosSchema = mongoose.Schema({
    name: { type: String, required: true},
    bio: { type: String, required: true }, 
    picture: {type: String, required: true },
});

module.exports = mongoose.model('Infos', infosSchema);