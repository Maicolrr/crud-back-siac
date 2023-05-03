const express = require("express")
const colors = require('colors')
const dotenv = require("dotenv").config() //variables de entorno //config archivo de var
const { connectDB } = require("./config/db")
const {errorHandler} = require("./middleware/errorMiddleware")


connectDB()

const app = express()

app.use(express.json()) //leer body
app.use(express.urlencoded({extended: false})) //leer URL


// app.use("/api/goals", require("./routes/goalsRouts.js"))
app.use("/api/users", require("./routes/userRouts.js"))
app.use("/api/products", require("./routes/productsRouts"))

app.use(errorHandler)


app.set("port",process.env.PORT || 5000)
app.listen(app.get("port"),()=>console.log(`Listen on port : ${app.get("port")}`))