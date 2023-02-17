const userModel = require('../models/userModel');
const bcryptAuth = require('../middleware/auth/encrypt-compare');

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        
        if (users) {

            res.render('users', {
                
            })
        } else {

        }
    } catch (error) {
        res.status(400).json({ message: "Users Not Founded" })
        console.log(error)
    }
};

const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userModel.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: "User not Found" })
    }
}; 

const userProfile = async (req, res) => {
    const id = req.params.id;
    const user = await userModel.findById(id);
    
    
    res.render('userProfile', {
        fName: user.fName, lName: user.lName, email: user.email,
        image: user.imagePath
    });
    
}

module.exports = {
    getAllUsers,
    getUser,
    userProfile
};

// adaptador
