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

03/11/22 - mongo using mongoose
- "npm install mongoose" //to install mongoose package
- create new db on mongodb website
- edit .env file to set MONGO_URI
- update server.js file to connect to mongodb using mongoose.connect

03/11/22 - create itemModel + edit post new itemModel 
- create models folder
- create itemModel.js
- create a new model using Mongoose Schema
- update POST a new item in tools.js. Destructureing req.body.Use Item.create() Add async and await. Add try/catch. Add res.status

04/11/22 - add controllers - part 1
- create controllers folder
- create itemControllers.js
- general purpose -> move (POST,GET,UPDATE, PATCH) functions declarations from tools.js to controllers
- create createtItem, getItem, getItems in itemControllers.js and export them 
- import above functions to tools.js

05/11/22 - add controllers - part 2
- create delete and update controller
- update tools.js and itemControllers.js in the same way as in part 1

05/11/22 - create frontend
- cd to main directory
- "npx create-react-app frontend"
- delete unnecessary react files
- delete unnecessary imports from index.js and App.js
- cd to frontend
- "npm install react-router-dom" to install react router package
- create pages and component folders in src folder
- create Navbar.js in components folder
- create Home.js in pages folder
- import Link form react router and create first link in Navbar.js
- update App.js using routing package, display Navbar and Home. First import both at the top.

05/11/22 - install Tailwind
- cd to frontend directory
- follow the doc on tailwindcss.com:
    - "npm install -D tailwindcss postcss autoprefixer" to install
    - "npx tailwindcss init -p" to init command and generate tailwind.config.js and postcss.config.js
    - and in tailwind.config.js  content: ["./src/**/*.{js,jsx,ts,tsx}",]
    - add @tailwind in index.css
- install react-icons "npm install react-icons --save"
- create a Navbar with Tailwind styling

06/11 - create footer
- create footer using tailwind

06/11 - create user model in express
- "npm install validator"
- "npm install bcrypt"
- "npm install jsonwebtoken"
- create userModel.js with validation and methods

07/11 - create login & signup logic in express
- create userController.js
- create user.js routes
- add user routes to server.js
- create requireAuth.js middleware for using routes only for authenticated users

07/11 - update login and user login in express
- update userController.js with if-check for login restricted to isAdmin == true only
- create '/userlist' route in user.js to list all users

07/11 - fetching data for Home.js
- add "proxy":"http://localhost:4000" in FRONTEND! package.json
- useEffect with useState in Home.js and awiat fetch to pass data from databes
- in fetch we use as path api/tools because we have so in the roots and have proxy for localhost:4000
- we return html at the and with map function to cycle thru all items

08/11 - create AuthContextProvider
- create context folder and AuthContext.js to be used as AuthContextProvider for tracking global user state
- add </AuthContextProvider> to index.js file and wrap the child
- create hooks folder and useAuthContext hook, which enables any component to get the current auth state and re-render if it changes

08/11 - create signup form for user registration
- create signup form with choice field for isAdmin
- add Signup element to App.js routes

08/11 - styling for items list in Workouts
- add tailwind styles for items card

11/11 - css styling and route changes
- showing items on items page insted of Home
- add styling to items cards
- create ItemDetail.js component to style the template here insted of Items.js

11/11 - new item form
- create ItemForm.js to add new Item
- add new link in Navbar for adding new Item
- update Routes in backend tools.js

11/11 - create admin page
- create login page
- crate admin page
- update routes

14/11 - connect singup/login/logout api to FRONTEND
- create hooks to handle fetch requests (useLogin, useSignup, useLogout)
- create Login.js, Singup.js pages with forms
- create redirect for login page in app.js
- prepare for auth protection
