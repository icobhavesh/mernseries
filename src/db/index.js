// import mongoose from "mongoose";
// import {DB_NAME} from "../constants.js"
// // const connectDB = async ()=>{
//     try {
//         const uri = process.env.MONGODB_URI;
//         const connectionInstance=await mongoose.connect(uri, { useNewUrlParser: true });
//         console.log(`\n mongoDb connected !!DB host :${connectionInstance.connection.host},`);
//     } 
//     catch (error) {
//         console.log("MONGODB connnection error",error);
//         process.exit(1)
//     } 
//         }
//     export default connectDB;

import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"
const connectDB = async ()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI} / ${DB_NAME}`)
        console.log(`\n mongoDb connected !!DB host :${connectionInstance.connection.host},`);//jha pr connection ho rha hai wha ka le le taki galti se kahi dusre server pr connect Na  ho jaye 
    } 
    catch (error) {
        console.log("MONGODB connnection error",error);
        process.exit(1)
    } 
        }
    export default connectDB
// import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";
// // import { DB_NAME as dbName } from "../constants.js";  // Use a different variable name here, e.g., dbName

// const connectDB = async () => {
//     try {
//         const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
//     } catch (error) {
//         console.log("MONGODB connection FAILED ", error);
//         process.exit(1);
//     }


// export default connectDB;


// const connectDB = async () => {
//     try {
//         const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
//     } catch (error) {
//         console.log("MONGODB connection FAILED ", error);
//         process.exit(1)
//     }
// }

// export default connectDB