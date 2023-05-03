const  mongoose = require("mongoose");

//nuestros metodos de mongoose todos son async y devuelven un promesa
const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongo Connected : ${conn.connection.host}`.bgCyan.underline);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }

}

module.exports={
    connectDB
}