const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller')



router.post('/create', userController.create)
router.get('/profile', userController.profile)
router.post('/create-session', userController.createSession)



module.exports = router;