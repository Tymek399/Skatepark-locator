const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skateparkSchema = new Schema({
    name: String,
    city: String,
    description: String
});

module.exports = mongoose.model('Skatepark', skateparkSchema);
