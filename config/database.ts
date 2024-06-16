import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Kết nối đến database thành công");
    }
    catch(error){
        console.warn("Kết nối đến database thất bại");
    }
}