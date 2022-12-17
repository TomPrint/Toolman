// upload.js

const multer = require('multer')
const { uploadToS3 } = require('../s3')

// multer configuration
const multerConfig = {
  limits : 1024 * 1024 * 5,
  fileFilter: function (req, file, done){
    if(file.mimetype === "image/jpg"|| file.mimetype === "image/png" || file.mimetype ==='image/jpeg'){
      done(null, true)
    }else{
        done("Niewłaściwy plik, użyj .jpg .jpeg .png", false)
      }
    }
}
const upload = multer(multerConfig)

//s3 route for single image upload
const imageUploadRoute = (app) => {
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
}

module.exports = {
  imageUploadRoute
}
