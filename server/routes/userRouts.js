const express = require("express")

// import { registerProduct } from "../controllers/userController"
// const { updateUser} = require("../controllers/userController")

const { registerUser, loginUser,getMe,forgotPw,resetUpdate, updateUser, deleteUser } = require("../controllers/userController")
const { protect } = require("../middleware/authMiddleware")
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/forgot-password', forgotPw)
router.post('/reset-password/:id/:token', resetUpdate)

router.put('/update-User/:id', updateUser)
router.delete('/delete/id', deleteUser)


router.get('/me',protect, getMe)



module.exports = router