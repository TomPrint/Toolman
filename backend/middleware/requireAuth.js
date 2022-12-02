const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)

    req.user = await User.findOne({ _id }).select('_id')
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth


// For Admin Only
// const adminAccess = (req, res, next) => {
//   auth(req, res, () => {
//     if (req.user.isAdmin) {
//       next();
//     } else {
//       res.status(403).send("Access denied. Not authorized...");
//     }
//   });
// };


// module.exports = {requireAuth, adminAccess}