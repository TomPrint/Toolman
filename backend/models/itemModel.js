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
    seller:{
        type: String,
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
    //Linking Worker model to an Item
    atEmployee: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref:'Worker',
    }
}, { timestamps: true })

module.exports = mongoose.model('Item', itemSchema)
