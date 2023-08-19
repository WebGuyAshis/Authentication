const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller')
const passport = require('passport');






router.post('/create', userController.create)
router.get('/profile', userController.profile)

router.post('/create-session',userController.genrateToken,passport.authenticate('jwt', {
    session:false
}), userController.createSession)
// @nain
// router.get('/sign-in')


module.exports = router;