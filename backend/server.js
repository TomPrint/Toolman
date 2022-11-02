//! IMPORTS & STARTER FUNCTIONS

require("dotenv").config();
const express = require("express");
const toolmanRoutes = require("./routes/tools");

// to start an express app
const app = express();

//! MIDDLEWARE

// middleware to show log of path and request method
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//express middleware to check for request body
app.use(express.json());

//! ROUTES

// uses tools.js in Routes folder to load routes
app.use("/api/tools", toolmanRoutes);

//! OTHER ACTIONS

//listen for requests
app.listen(process.env.PORT, () => {
  console.log("monitoring port", process.env.PORT);
});
