import mongoose from "mongoose"

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb Connected Succesully")
    }
    catch(error){
        console.log("Error connecting to conect",error)
        process.exit(1)
    }
}

export default connectDB;