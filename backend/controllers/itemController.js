const Item = require('../models/itemModel')
const Worker = require('../models/workerModel')
const mongoose = require('mongoose')
const multer = require('multer')
const { uploadToS3 } = require('../s3')

const multerConfig = {
  limits: {
    fileSize: 1048576, // 1 megabyte
  },
  fileFilter: function (req, file, done) {
    if (file.mimetype !== "image/jpg" && file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
      const error = new Error("Zły format pliku, użyj .jpeg, .jpg, .png");
      return done(error, false);
    }

    const fileSize = parseInt(req.headers['content-length']);
    if (fileSize > 1048576) {
      const error = new Error('Plik za duży, użyj pliku do 1MB');
      // console.log(fileSize)
      return done(error, false);
    }

    return done(null, true);
  },
};

const upload = multer(multerConfig)

//! CREATE new item 
const createItem = async (req, res) => {
  // multer middleware that handles file upload
  upload.single("image")(req, res, async (error) => {
    if (error) {
      return res.status(400).json({ error: error.message});
    }

    const {
      title,
      model,
      producer,
      serialNumber,
      yearOfProduction,
      atEmployee,
      seller,
      warrantyDate,
      purchaseDate,
      image,
      transmissionDate,
      invoice,
      price,
      comments
    } = req.body

    if (!title) {
      return res.status(400).json({error: 'Błąd! Wymagane jest podanie chociaż nazwy narzędzia.'});
    }
    
    //try-catch to create new Item and catch error. Add "await" because of "async" - Js promise above
    try {
      let item = {}
      if (req.file) {
        // upload file to S3 and store the URL in the database if image has been uploaded
        const result = await uploadToS3(req.file.buffer)
        item = await Item.create({
          title,
          model,
          producer,
          serialNumber,
          yearOfProduction,
          atEmployee,
          seller,
          warrantyDate,
          purchaseDate,
          transmissionDate,
          invoice,
          price,
          comments,
          image: result.Location,
        })
        //if no image, don't show anything
      } else {
        
        item = await Item.create({
          title,
          model,
          producer,
          serialNumber,
          yearOfProduction,
          atEmployee,
          seller,
          warrantyDate,
          purchaseDate,
          transmissionDate,
          price,
          comments,
          invoice
          
        })
      }

      res.status(200).json(item)
    } catch(error) {
      res.status(400).json({error: error.message})
    }
  })
}

//! GET all items

const getItems = async (req, res) => {
  //grab all items and sorted descending with created date
  const items = await Item.find({}).populate('atEmployee').sort('title')
 
  res.status(200).json(items)
}

//! GET single item

const getItem = async (req, res) => {
  //grab id from req.params
  const { id } = req.params 
  //check if id is valid type of mongoose id. If not res error.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such item'})
  }
  //Find item by id
  const item = await Item.findById(id).populate('atEmployee')
  // if no item - res error
  if (!item) {
    return res.status(404).json({error: 'No such item'})
  }
  //if item is present, response ok status
  res.status(200).json(item)
}

// DELETE item

const deleteItem = async (req,res) => {
  //grab id from req.params
  const { id } = req.params 
  //check if id is valid type of mongoose id. If not res error.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such item'})
  }
  //in mongoose id = _id. So function - finds and delete the item that _id is id that we took from req.params
  const item = await Item.findOneAndDelete({_id: id })

  // if no item - res error
  if (!item) {
    return res.status(404).json({error: 'No such item'})
  }
  //if item is present, response ok status
  res.status(200).json(item)

}
// UPDATE item

const updateItem = async (req,res) => {
  //grab id from req.params
  const { id } = req.params 
  //check if id is valid type of mongoose id. If not res error.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such item'})
  }
  // update the item found by id, as a second argument we pass new data frome req.body
  const item = await Item.updateOne({_id: id }, {
    
    // req.body is an object so we spread that object into properties by ...
    ...req.body
  })
  // if no item - res error
  if (!item) {
    return res.status(404).json({error: 'No such item'})
  }
  //if item is present, response ok status
  res.status(200).json(item)
}

const findItems = async (req,res) => {
  const { key } = req.params 
  const items = await Item.find ({
    "$or":[
      {
        title: {$regex: new RegExp(key, "i") },
      },
      {
        producer: {$regex: new RegExp(key, "i") },
      },
    ]
  })
  if(items.length<1){
    return res.status(404).json({error: 'No such item'})
  }else {res.status(200).json(items)}
}





module.exports = {
    createItem,
    getItems,
    getItem,
    deleteItem,
    updateItem,
    findItems,
}