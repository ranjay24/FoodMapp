// mongopass= wEnUfmjuZxc5MNCU
// mongouser=ran2492002

import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI!);
    }
    catch(error){
    }
}
export default connectDB;