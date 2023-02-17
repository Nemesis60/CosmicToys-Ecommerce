const express = require('express');
const userCtr = require('../../controllers/userController');
const { checkAuthLogin, rolAuth } = require('../../middleware/auth/auth');

const userRoute = express.Router();

userRoute.get('/users', );
userRoute.get('/:id', checkAuthLogin, rolAuth(['Admin']), userCtr.getUser);
userRoute.get('/profile/:id');

module.exports = userRoute;