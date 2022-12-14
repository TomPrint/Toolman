const express = require("express");

const {
  createWorker,
  getWorkers,
  getWorker,
  getWorkerItems,
  deleteWorker,
  updateWorker,
} = require("../controllers/workerController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
// require authorization for all routes
router.use(requireAuth)


// GET all workers
router.get("/workers", getWorkers);

// GET a single worker
router.get("/workers/:id", getWorker);

//GET a single worker all items
router.get("/workers/:id/items", getWorkerItems, getWorker);

// POST a new worker
router.post("/workers/add", createWorker);

// DELETE a worker
router.delete("/workers/:id", deleteWorker)

// // UPDATE a worker
// router.patch("/:id", updateWorker)

module.exports = router;
