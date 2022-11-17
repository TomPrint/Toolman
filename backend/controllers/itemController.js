const Item = require('../models/itemModel')
const Worker = require('../models/workerModel')
const mongoose = require('mongoose')

//! CREATE new item 
const createItem = async (req, res) => {
  //destructuring form req.body
  const {title, model, serialNumber, yearOfProduction, atEmployee} = req.body
  //try-catch to create new Item and catch error. Add "await" because of "async" - Js promise above
  try {
    const item = await Item.create({title, model, serialNumber, yearOfProduction, atEmployee})
    res.status(200).json(item)
  } catch(error) {
    res.status(400).json({error: error.message})
  }
}

//! GET all items

const getItems = async (req, res) => {
  //grab all items and sorted descending with created date
  const items = await Item.find({}).populate('atEmployee')
 
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

const deleteItem = async (req,res) => {
  //grab id from req.params
  const { id } = req.params 
  //check if id is valid type of mongoose id. If not res error.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such item'})
  }
  //in mongoose id = _id. So function - finds and delete the item that _id is id that we took from req.params
  const item = await Item.findOneAndDelete({_id: id })

  // if no item - res error
  if (!item) {
    return res.status(404).json({error: 'No such item'})
  }
  //if item is present, response ok status
  res.status(200).json(item)

}
// UPDATE item

const updateItem = async (req,res) => {
  //grab id from req.params
  const { id } = req.params 
  //check if id is valid type of mongoose id. If not res error.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such item'})
  }
  // update the item found by id, as a second argument we pass new data frome req.body
  const item = await Item.findOneAndUpdate({_id: id }, {
    // req.body is an object so we spread that object into properties by ...
    ...req.body
  })
  // if no item - res error
  if (!item) {
    return res.status(404).json({error: 'No such item'})
  }
  //if item is present, response ok status
  res.status(200).json(item)
}





module.exports = {
    createItem,
    getItems,
    getItem,
    deleteItem,
    updateItem,
}