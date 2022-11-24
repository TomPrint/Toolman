const Worker = require('../models/workerModel')
const Item = require('../models/itemModel')
const mongoose = require('mongoose')

//! CREATE new item 
const createWorker = async (req, res) => {
  //destructuring form req.body
  const {name, position} = req.body 
  
  //try-catch to create new Item and catch error. Add "await" because of "async" - Js promise above
  try {
    const worker = await Worker.create({name, position})
    res.status(200).json(worker)
  } catch(error) {
    res.status(400).json({error: error.message})
  }
}

//! GET all items

const getWorkers = async (req, res) => {
  //grab all items and sorted descending with created date
  const workers = await Worker.find({}).sort({createdAt:-1})
  res.status(200).json(workers)
}

//! GET single item

const getWorker = async (req, res) => {
  //grab id from req.params
  const { id } = req.params 
  //check if id is valid type of mongoose id. If not res error.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such worker'})
  }
  //Find item by id
  const worker = await Worker.findById(id)
  // if no item - res error
  if (!worker) {
    return res.status(404).json({error: 'No such worker'})
  }
  //if item is present, response ok status
  res.status(200).json(worker)
}

//! GET a single worker all items // need to add error check later here

const getWorkerItems = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such worker'})
  }
  const worker = await Worker.findById(id) 
  if (!worker) {
    return res.status(404).json({error: 'No such worker'})
  }
  const workerItems = await Item.find({atEmployee:id})
  res.status(200).json(workerItems)
  }
  
// DELETE item

const deleteWorker = async (req,res) => {
  //grab id from req.params
  const { id } = req.params 
  //check if id is valid type of mongoose id. If not res error.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such worker'})
  }
  //in mongoose id = _id. So function - finds and delete the item that _id is id that we took from req.params
  const worker = await Worker.findOneAndDelete({_id: id })

  // if no item - res error
  if (!worker) {
    return res.status(404).json({error: 'No such worker'})
  }
  //if item is present, response ok status
  res.status(200).json(worker)

}
// UPDATE item

const updateWorker = async (req,res) => {
  //grab id from req.params
  const { id } = req.params 
  //check if id is valid type of mongoose id. If not res error.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such worker'})
  }
  // update the item found by id, as a second argument we pass new data frome req.body
  const worker = await Worker.findOneAndUpdate({_id: id }, {
    // req.body is an object so we spread that object into properties by ...
    ...req.body
  })
  // if no item - res error
  if (!worker) {
    return res.status(404).json({error: 'No such worker'})
  }
  //if item is present, response ok status
  res.status(200).json(worker)
}





module.exports = {
    createWorker,
    getWorker,
    getWorkers,
    deleteWorker,
    updateWorker,
    getWorkerItems
}