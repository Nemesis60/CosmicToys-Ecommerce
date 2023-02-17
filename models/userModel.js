const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        require: true,
        min: 3,
        max: 50,
        trim: true
    },
    lName: {
        type: String,
        require: true,
        min: 3,
        max: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    rol: {
        type: String,
        default: "User",
        require: false,
        trim: true
    },
    imagePath: {
        type: String,
        default: "",
    }
},
// timestamps add two properties type date:
//  createdAt, updatedAt
{ timestamps: true }
)

const User = mongoose.model("Users", userSchema);
module.exports = User;