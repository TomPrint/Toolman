const mongoose = require('mongoose')

//mongoose function to create new model Schema
const Schema = mongoose.Schema

const workerSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        require: false,
    }
}, { timestamps: true })

module.exports = mongoose.model('Worker', workerSchema)
