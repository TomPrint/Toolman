//! IMPORTS & STARTER FUNCTIONS

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose")
const toolmanRoutes = require("./routes/tools");
const userRoutes = require('./routes/user')
const employeeRoutes = require('./routes/employee')

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

// user routes
app.use('/api/user', userRoutes)

// employee routes
app.use('/api/employee', employeeRoutes)


//! DATABESE CONNECTION
//connect to db
mongoose.connect(process.env.MONGO_URI)

.then(()=>{
  
  //listen for requests
  app.listen(process.env.PORT, () => {
    console.log("Connected to db and listening on port", process.env.PORT);
  });
})
.catch((error) =>{
  console.log(error)
})

