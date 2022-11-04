const Item = require('../models/itemModel')
const mongoose = require('mongoose')

//! CREATE new item 
const createItem = async (req, res) => {
  //destructuring form req.body
  const {title, model, serialNumber, yearOfProduction } = req.body
  
  //try-catch to create new Item and catch error. Add "await" because of "async" - Js promise above
  try {
    const item = await Item.create({title, model, serialNumber, yearOfProduction })
    res.status(200).json(item)
  } catch(error) {
    res.status(400).json({error: error.message})
  }
}

//! GET all items
const getItems = async (req, res) => {
  //grab all items and sorted descending with created date
  const items = await Item.find({}).sort({createdAt:-1})
  res.status(200).json(items)
}

//! GET single item
const getItem = async (req, res) => {
  //grab id from req.params
  const { id } = req.params 
  //check if id is valid type of mongoose id. If not res error.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such item'})
  }
  //Find item by id
  const item = await Item.findById(id)
  // if no item - res error
  if (!item) {
    return res.status(404).json({error: 'No such item'})
  }
  //if item is present, response ok status
  res.status(200).json(item)
}

// DELETE item

// UPDATE item

module.exports = {
    createItem,
    getItems,
    getItem
}