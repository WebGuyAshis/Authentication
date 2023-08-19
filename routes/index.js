const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')




router.get('/', homeController.home)
router.get('/sign-up', homeController.signUp)
router.use('/users', require('./users'))


module.exports = router;