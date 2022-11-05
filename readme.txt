02/11/22 - backend inital setup -
- create backend folder
- create server.js inside backend folder
- "npm init -y" //to create package.json file
- "npm install express" //to install express and create package-lock.json
- "npm install -g nodemon" //-g flag to install nodemon globally (if it is not installed already)
- setting nodemon start script command from nodemon server.js to "npm run app" inside package.json
- "npm install dotenv" to support .env variables
- create middleware to log type of requests
- create Routes folder and tools.js file to list requests and routes

03/11/22 - part 1 -  mongo using mongoose
- "npm install mongoose" //to install mongoose package
- create new db on mongodb website
- edit .env file to set MONGO_URI
- update server.js file to connect to mongodb using mongoose.connect

03/11/22 - part 2 - create itemModel + edit post new itemModel
- create models folder
- create itemModel.js
- create a new model using Mongoose Schema
- update POST a new item in tools.js. Destructureing req.body.Use Item.create() Add async and await. Add try/catch. Add res.status

04/11/22 - add controllers -part1
- create controllers folder
- create itemControllers.js
- general purpose -> move (POST,GET,UPDATE, PATCH) functions declarations from tools.js to controllers
- create createtItem, getItem, getItems in itemControllers.js and export them 
- import above functions to tools.js

05/11/22 - add controllers - part2
- create delete and update controller
- update tools.js and itemControllers.js in the same way as in part 1.