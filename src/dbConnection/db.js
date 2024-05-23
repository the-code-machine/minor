import mongoose from "mongoose";
export const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Connected to DataBase !")
    } catch(error){
        console.log(`Some error occured while connecting to DataBase !, ${error}`);
    }
}




