const express = require('express');

const { 
  createItem,
   getItems,
   getItem,
   deleteItem,
   updateItem,
   findItems
   } = require('../controllers/itemController')

const { getWorkers } = require('../controllers/workerController')
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
// require authorization for all routes
// router.use(requireAuth)


// GET all items
router.get("/items", getItems, getWorkers)

// GET a single item
router.get("/items/:id", getItem)

// POST a new item
router.post("/items/add", createItem, getWorkers)

// DELETE an item
router.delete("/items/:id", deleteItem)

// UPDATE an item
router.put("/items/update/:id", updateItem)

//FIND an item
router.get("/items/search/:key", findItems)


module.exports = router;
