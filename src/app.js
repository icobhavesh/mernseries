import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true//homework 
}))//it allows us to where we wanted to  access req 
app.use(express.json({limit:"16kb"}))//it allows us to access json data 
app.use(express.urlencoded({extended:true}))//when data come from url 
//extended allows us to write multiple object       
app.use(express.static("public"))//store local file so we can access
app.use(cookieParser())
//routes
import  userRouter from "./routes/user.routes.js"
app.use("/api/v1/users",userRouter)
export  {app}