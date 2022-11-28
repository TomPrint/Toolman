const express = require('express');
const {requireAuth, adminAccess} = require ('../middleware/requireAuth')
const { 
  createItem,
   getItems,
   getItem,
   deleteItem,
   updateItem
   } = require('../controllers/itemController')

const { getWorkers } = require('../controllers/workerController')

const router = express.Router();
// require authorization for all routes
// router.use(requireAuth)


// GET all items
router.get("/items", getItems, getWorkers)

// GET a single item
router.get("/items/:id", getItem)

// POST a new item
router.post("/items/add", createItem, getWorkers)

// DELETE a item
router.delete("/:id", deleteItem)

// UPDATE a item
router.patch("/:id", updateItem)

module.exports = router;
