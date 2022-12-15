//! IMPORTS & STARTER FUNCTIONS

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose")
const toolmanRoutes = require("./routes/tools");
const userRoutes = require('./routes/user')
const employeeRoutes = require('./routes/employee')
const AWS = require('aws-sdk')
const multer = require("multer")

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

//! S3 BUCKET AND MULTER CONFIGURATION

// s3 bucket configuration
const awsConfig = {
  accessKeyid : process.env.S3_ACCESS_KEY,
  secretAccessKey : process.env.S3_ACCESS_SECRET,
  region : process.env.S3_REGION
}
const S3 = new AWS.S3(awsConfig)

// multer configuration
let upload = multer({
  limits : 1024 * 1024 * 5,
  fileFilter: function (req, file, done){
    if(file.mimetype === "image/jpg"|| file.mimetype === "image/png" || file.mimetype ==='image/jpeg'){
      done(null, true)
    }else{
        done("Niewłaściwy plik, użyj .jpg .jpeg .png", false)
      }
    }
})

//s3 bucket upload
const uploadToS3 = (fileData) => {
  return new Promise ((resolve, reject) =>{
    const params = {
      Bucket : process.env.S3_BUCKET_NAME,
      Key: `${Date.now().toString()}.jpg`,
      Body: fileData 
    }
      S3.upload(params, (err, data) =>{
        if(err){
          console.log(err)
          reject(err)
        }
        console.log(data)
        return resolve(data)
      })

  })
}

//s3 route for single image upload
app.post('/upload', upload.single("image"), (req,res)=>{
  console.log(req.file)

  if(req.file){
    uploadToS3(req.file.buffer).then((result)=>{
      return res.json({
        msg: "Plik wgrany do S3 Bucket",
        imageUrl: result.location
      })
    }).catch((err)=>{
      console.log(err)
    })
  }
})

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

