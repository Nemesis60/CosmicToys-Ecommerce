const jwt = require('jsonwebtoken');
const userModel = require('../../models/userModel');

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY)
    } catch (error) {
        return console.log(error)
    }
}

// *THIS FUNCTION IS USED IN ROUTES*
// This function check if the user are login or register
// and have a token if yes allow continue
const checkAuthLogin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token)
        console.log(token)
        console.log(tokenData)

        if (tokenData._id) {
            next()
        } else {
            res.status(409).send({ error: "Apologies" })
        }
    } catch (error) {
        console.log(error)
        res.status(409).send({ error: "Apologies" })
    }
}

// *THIS FUNCTION IS USED IN ROUTES*
// when the user is login or register and have a rol Admin
// have access to routes that just Admins can
const rolAuth = (rol) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);
        const data = await userModel.findById(tokenData._id);

        if ([].concat(rol).includes(data.rol)) {
            next()
        } else {
            res.status(409).send({ error: "Apologies you haven't permissions" })
        }
    } catch (error) {
        console.log(error)
        res.status(409).send({ error: "Apologies you haven't permissions" })
    }
}

module.exports = {
    verifyToken,
    checkAuthLogin,
    rolAuth
}