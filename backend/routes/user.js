const express = require('express')

//! controller functions
const { loginUser, signupUser, getUsers, deleteUser, resetPassword } = require('../controllers/userController')
const requireAuth = require("../middleware/requireAuth");

const router = express.Router()


//! login route
router.post('/login', loginUser)


//! signup route
router.post('/signup', requireAuth, signupUser)

//! getAllUsers route
router.get('/users', getUsers)

//! deleteUser route
router.delete('/:id', requireAuth, deleteUser)

//! resetPassword
router.post('/reset-password', resetPassword)

module.exports = router