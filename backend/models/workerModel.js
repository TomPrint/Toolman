const mongoose = require('mongoose')

//mongoose function to create new model Schema
const Schema = mongoose.Schema

const workerSchema = new Schema ({
    name: {
        type: String,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Worker', workerSchema)
