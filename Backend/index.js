import express from "express"
import { config } from "dotenv"
import Razorpay from "razorpay"
import cors from "cors"
config({path:"./config/config.env"})
const router=express.Router()
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


// app.use("/api",router)


const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

  app.post("/checkout",async(req,res)=>{
    const {amount,title}=req.body
    
    const options={
        amount,
        currency:"INR"
    }

    const order=await instance.orders.create(options)
    // console.log(order)
    res.send(order)
    // res.status(200).json({
    //     success:true,
    //     order,
    // })
  })



  app.post("/paymentverification",async(req,res)=>{
    console.log(req.body)
    res.status(200).json({
        status:true
    })
  })



 
app.listen(process.env.PORT,()=>{console.log(`server is running on port ${process.env.PORT}`)})