const mongoose = require('mongoose');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

const realisationSchema = mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    videoUrl: { type: String, required: true }, 
    picture: {type: String, required: true },
});

realisationSchema.plugin(sanitizerPlugin);

module.exports = mongoose.model('Realisation', realisationSchema);