const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    // User: {
    //     // this mean that have a relation with User
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Users",
    //     required: true
    // },
    title: {
        type: String,
        require: true,
        trim: true
    },
    lDescription: {
        type: String,
        require: true,
        trim: true
    },
    sDescription: {
        type: String,
        require: true,
        trim: true
    },
    price: {
        type: Number,
        require: true,
        trim: true
    },
    offer: {
        type: Number,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    typeShipping: {
        type: Boolean,
        default: false,
    },
    recommendedAge: {
        type: String,
        require: true,
        trim: true,
    },
    inStock: {
        type: Number,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
},
{timestamps: true}
);

module.exports = mongoose.model("Products", productSchema)