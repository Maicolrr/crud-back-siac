//Productos
const  mongoose = require("mongoose");


const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
    },
    category: {
        type: String,
        required: [true, 'Please add an category'],
    },
    amount: {
        type: String,
        required: [true, 'Please add an amount'],
    },
    
},
{
    timestamps: true
})

module.exports = mongoose.model('Product',productSchema)