// s3 configuration
const AWS = require('aws-sdk')

// s3 bucket configuration
const awsConfig = {
    accessKeyid : process.env.S3_ACCESS_KEY,
    secretAccessKey : process.env.S3_ACCESS_SECRET,
    region : process.env.S3_REGION
  }
  const S3 = new AWS.S3(awsConfig)
  
  //s3 bucket upload function
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
          // console.log(data)
          // console.log(data.Location)
          return resolve(data)
        })
  
    })
  }
  module.exports = {
    uploadToS3
  }