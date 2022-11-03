const mongoose = require('mongoose')

//mongoose function to create new model Schema
const Schema = mongoose.Schema

const itemSchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    producer: {
        type: String,
        required: false,
    },
    model: { 
        type: String,
        required: false,
    },
    serialNumber: {
        type: String,
        required: false,
    },
    yearOfProduction:{
        type: Number,
        required: false
    },
    purchaseDate: { 
        type: Date,
        default: Date.now
    },
    warrantyDate: {
        type: Date,
        required: false,
    },
    atEmployee: {
        type: String,
        required: false,
    }
}, { timestamps: true })

module.exports = mongoose.model('Item', itemSchema)
