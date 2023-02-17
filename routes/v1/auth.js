const express = require('express');
const authCtr = require('../../controllers/auth')

const authRoute = express.Router();

authRoute.post('/register', authCtr.registerUser);
authRoute.post('/login', authCtr.login);
authRoute.get('/refresh', authCtr.refreshToken);
authRoute.post('/logout', authCtr.logout);

module.exports = authRoute;