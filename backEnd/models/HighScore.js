const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const highScoreSchema = new Schema({
    score: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('HighScore', highScoreSchema);