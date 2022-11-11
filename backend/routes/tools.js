const express = require('express');
const { 
  createItem,
   getItems,
   getItem,
   deleteItem,
   updateItem
   } = require('../controllers/itemController')

const router = express.Router();


// GET all items
router.get("/", getItems)
router.get("/items", getItems)

// GET a single item
router.get("/:id", getItem)

// POST a new item
router.post("/", createItem)
router.post("/items/add", createItem)

// DELETE a item
router.delete("/:id", deleteItem)

// UPDATE a item
router.patch("/:id", updateItem)

module.exports = router;
