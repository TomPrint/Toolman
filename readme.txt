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

13/11 - crete worker backend and frontend
#BACKEND:
- create routes in employee.js
- import this routes in server.js
- create workerModel.js
- create workerController.js
#FRONTEND:
- create Workers.js in pages 
- create WorkerForm to create new worker
- create WorkerDetail to show template in Workers.js

14/11 - connect singup/login/logout api to frontend

14/11 - connect singup/login/logout api to FRONTEND
- create hooks to handle fetch requests (useLogin, useSignup, useLogout)
- create Login.js, Singup.js pages with forms
- create redirect for login page in app.js
- prepare for auth protection

14/11 - 1st step to create db realtions between Items and Workers
- updated ItemModel with atEmployee - ref to "Worker" model
- update in frontend ItemDetails and WorkerDetails just to show connections above

15/11 - connect getUsers api to frontend
- fetching all users from api to frontend
- create ManageUser.js page and UserDetails.js component
- "npm install react-icons --save" to get react icons
- add style to UserDetails.js

15/11 - 2nd step to create db realations between Items and Workers
- populate the query for showing all Items relation to employee
- update ItemDetails to show Item.atEmployee.name in Item page

15/11 - styling update
- change the default images for item and worker

15/11 - 3rd step to create db ralatios between Items and Workers
- update workerControler with new function getWorkerItems to show all items that belongs to worker
- update employee routes with above function

17/11 - routes and itemDetail fix
- update correct routes in tools.js and employee.js
- update paths in fetch in Worker, WorkerForm, Item, ItemForm
- add logic in itemDetail to show items that were not assign to a worker
- display information that item is not assign

18/11 - 4th step to create db realations between Items and Workers
- update employee routes in backend
- fix a query name in workerController.js in backend
- update WorkerDetail.js with link that shows all items asign to worker (passing id)
- create WorkerItems with useParams to deliver ID 
- create new path in app.js in frontend

19/11 - displaying data in table in WorkerItems.js

19/11 - create delete route and frontend connections
- create delete route and logic in userController
- setup inital frontend connection
- displaying data in table
- styling table view 

19/11 - small changes related to Worker
- add new fields to Worker model & update Controller, model, form
- "npm install date-fns" do format date in template (date fron timestamp in model)
- prepare select in item form to chose a Worker while creating an item

20/11 - 5th step to create db realations between Items and Workers - add New Item with Worker name on select field
- update tools.js route to pass getWorker function to create new Item view
- update ItemForm.js to show Workers name in select field

20/11 - final step - chose worker from select dropbox while creating an item 
- update ItemForm.js to chose worker form select dropbox while createing an item
- changes PL descirptions in all views
- add sort by ttle in GET ALL Items
- update styling in itemsDetails.js
- update styling in itemForm.js
- change Navbar description na styling
- update styling in WorkerDetails.js
- 

23/11 - update MangeUsers.js with delete function
- fetchAll users and delete user by _id
- frontend table to display all users
- update messages and error alert in Polish

23/11 - new item form - error&sucess messages
- update ItemControler.js and itemForm to show error or sucess messages

23/11 - styling homepage and ManageUser page
- show user.email at homepage
- style ManageUser page to work on mobile devices
- lesser css changes

24/11 - react-spinner-loader
- "npm install react-loader-spinner --save"
- create LoadingSpinner.js in components & import loading-spinner there - DNA type.
- import loading spiner into ManageUser.js - create loading state and create logic in render
- import loading spiner into Workers.js - create loading state and create logic in render
- import loading spiner into Items.js - create loading state and create logic in render
- import loading spiner into WorkerItems.js - create loading state and create logic in render
- update styling and fix button in admin panel


25/11 - updates in itemModel and views + tailwind styles
- add transition to delete button in ManageUser
- in WorkerItems - show the name of the Item Owner.
- add new fields in Item Model in backend + update itemController
- update Item Form to add new fields while creating a new item
- update views - ItemDetails, WorkerItems to show new fields
- update button transition hover in Admin

26/11 - create SingleItem view
- update itemController to populate queryset to show atEmployee.name
- update Routes in App.js ->  /items/itemId -> "itemId" passed as useParams() to SingleItem
- update Routes in backend -> tools.js
- update ItemDetail to add buton to a SingleItem and pass the ID
- code cleaning in WorkerDetails.js
- create SingleItem.js to show single item with all details taken from Item Form. (creating new Item)

27/11 - deleting an Item
- update tools.js in backend
- add button and handleDelete in SingleItems.js
- use Navigate to redirect to sucess url after deleting.

29/11 - add modal before deleting an Item
- create Modal.js
- add modal logic to SingleItem.js
- need styling to finish

30/11 - styling modal and SingleItem
- update styling in Modal.js using Tailwind
- update styling in SingleItem.js using Tailwind
- add descirption property to pass to modal

02/12 - delete user modal
- create DeleteUserModal
- passing props with onSubmit
- invoking a delete function in ManageUser when modal is confirmed

02/12 - protecting employee api routes from unauthorized users
BACKEND
- apply requireAuth for all employee routes by adding router.use(requireAuth)
FRONTEND
-use authorization in headers while fetching data
-if-check for user before fetch function is called