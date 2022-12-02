const express = require('express');
const { 
   createWorker,
   getWorkers,
   getWorker,
   getWorkerItems,
   deleteWorker,
   updateWorker,

   } = require("../controllers/workerController")

const router = express.Router();


// GET all workers
router.get("/workers", getWorkers)

// GET a single worker
router.get("/workers/:id", getWorker)

//GET a single worker all items
router.get("/workers/:id/items", getWorkerItems, getWorker)

// POST a new worker
router.post("/workers/add", createWorker)

// // DELETE a worker
// router.delete("/:id", deleteWorker)

// // UPDATE a worker
// router.patch("/:id", updateWorker)

module.exports = router;
