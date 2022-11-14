const express = require('express');
const {requireAuth, adminAccess} = require ('../middleware/requireAuth')
const { 
  createItem,
   getItems,
   getItem,
   deleteItem,
   updateItem
   } = require('../controllers/itemController')

const router = express.Router();
// require authorization for all routes
// router.use(requireAuth)


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
