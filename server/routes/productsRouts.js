const express = require("express")

const { registerProduct, deleteProduct, getProduct, updateProduct,allProduct} = require("../controllers/productsController")
const router = express.Router()

//registar un producto
router.post('/register-products', registerProduct)
//traer un producto
router.get('/get-product/', getProduct)


//traer todos productos
router.get('/all-product',allProduct)



//actualizr un producto
router.put('/update-product/:id',updateProduct )
//borrar un producto
router.delete('/delete-products/', deleteProduct)



module.exports = router