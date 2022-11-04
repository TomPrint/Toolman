const express = require('express');
const { 
  createItem,
   getItems,
   getItem
   } = require('../controllers/itemController')

const router = express.Router();

// GET all items
router.get("/", getItems)

// GET a single item
router.get("/:id", getItem)

// POST a new item
router.post("/", createItem)

// DELETE a item
router.delete("/:id", (req, res) => {
  res.json({ mssg: "DELETE an item" });
});

// UPDATE a item
router.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE an item" });
});

module.exports = router;
