import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            autoIndex:true
        })
        console.log('Connected')
        const connect = mongoose.connection;
        connect.on('connected',()=>{
            console.log(`MongoDB connected`);
        })
    } catch (error) {
        console.log(error)
    }
}