const express = require('express')
const {requireAuth} = require('../middleware/requireAuth')

//! controller functions
const { loginUser, signupUser, getUsers } = require('../controllers/userController')

const router = express.Router()


//! login route
router.post('/login', loginUser)


//! signup route
router.post('/signup', requireAuth, signupUser)

module.exports = router

//! getAllUsers routes
router.get('/userlist', getUsers)