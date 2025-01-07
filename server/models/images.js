const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    src: String,
    caption: String,
    email: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
});

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;
