// const jwt = require("jsonwebtoken")
// const bcrypt = require('bcryptjs')
// const User = require("../model/userModel")
// const nodemailer = require("nodemailer"); 
const asyncHandler = require('express-async-handler')
const Product = require("../model/productsModel")


//@Desc     Register Product
//@Route    POST /api/products/register-products
//@Access   Public
const registerProduct = asyncHandler(async(req,res)=>{

    const {name, price, category, amount} = req.body

    if(!name || !price || !category || !amount){
        res.status(400)
        throw new Error('Please add all fiels')
    }

    // check if Product exist
    const productExists = await Product.findOne({name})

    if(productExists){
        res.status(400)
        throw new Error('Product already exists')
    }

    // Create Product

    const product = await Product.create({
        name,
        price,
        category,
        amount

    })

    if (product) {
    res.status(201).json({
      _id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      amount: product.amount,
    })
  } else {
    res.status(400)
    throw new Error('Invalid Product data')
  }
})


//@Desc     Get data product
//@Route    GET /api/products/all-product
//@Access   Private
const allProduct = asyncHandler(async(req,res)=>{
  const product = await Product.find()
  res.json(product)
  
})


//@Desc     Get data product
//@Route    GET /api/products/get-product/
//@Access   Private
const getProduct = asyncHandler(async(req,res)=>{

  const {name} = req.body;

  const product = await Product.findOne({ name: name })

  if(product){
    
    res.status(201).json({
      _id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      amount: product.amount,
    })

  } else{
    res.status(200).json({ status: "product Not Exists!!"})
  }

  
})


//@Desc     update Product
//@Route    PUT /api/products/update-product/
//@Access   private
const updateProduct = asyncHandler (async (req,res)=>{
  
  const {id} = req.params;
  const { name, price, category, amount} = req.body;

  const product = await Product.findOne({_id: id })

  if (product) {

    try {
      await Product.updateOne(
        {
          _id: id,
        },
        {
          $set:{
            name:name,
            price:price,
            category:category,
            amount:amount
          },
        }
      );
      
      res.status(201).json({
        _id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        amount: product.amount,
        status: "verified"
      })
  
    } catch (error) {
  
      res.json({ status: "Something Went Wrong" });
    }

  }else{
    res.status(200).json({ status: "product Not Exists!!" });
  }
  
  res.status(201).json({
    _id: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
    amount: product.amount,
    status: "verified"
  })
})



//@Desc     delete Product
//@Route    DELETE /api/products/delete-products/
//@Access   private
const deleteProduct = asyncHandler ( async (req,res)=>{


  const {id} = req.body;

  const product = await Product.findOne({_id: id })

  if(product){
    
    await product.remove()
    res.status(200).json({status: "product deleted successfully"})
  } else{
  
    res.status(200).json({status: "product Not Exists!!" })
  }
    

})


module.exports = {
  registerProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  allProduct
}