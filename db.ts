import mongoose from "mongoose";

const connectDB = async():Promise<void> => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDb connected: ${con.connection.host}`);
        
    } catch (error) {
        console.log(error);
        process.exit(1)
        
    }
}


export default connectDB