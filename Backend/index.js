import express from "express"
import { config } from "dotenv"
import Razorpay from "razorpay"
import cors from "cors"
import crypto from "crypto"
import mongoose from "mongoose"
// import { stringify } from "querystring"

config({path:"./config/config.env"})
const router=express.Router()
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

mongoose.connect("mongodb://localhost:27017/razor",()=>{
    console.log("mongo connected succesfully")
})

const Payment_Schema=new mongoose.Schema({
    razorpay_order_id:{
        type:String,
        required:true
},
    razorpay_payment_id:{
        type:String,
        required:true
    },
    razorpay_signature:{
        type:String,
        required:true
    }
})
// app.use("/api",router)
const Payment=new mongoose.model("paymentDetail",Payment_Schema)

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

    // console.log(req.body)
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body

    const body=razorpay_order_id + "|" + razorpay_payment_id;

    console.log(razorpay_order_id,razorpay_payment_id,razorpay_signature)

    // var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
                                    .update(body.toString())
                                    .digest('hex');
                                    console.log("sig received " ,razorpay_signature);
                                    console.log("sig generated " ,expectedSignature);
   
    if(expectedSignature === razorpay_signature){
         await Payment.create({
            razorpay_order_id,razorpay_payment_id,razorpay_signature
         })
        res.redirect(`http://localhost:4000/paymentsuccessfull?reference=${razorpay_payment_id}`)
    }
    else{ 
        res.status(200).json({
            success:false
        })
    }
   
//    console.log(req.body)
//    res.send("success")
   
  })



 
app.listen(process.env.PORT,()=>{console.log(`server is running on port ${process.env.PORT}`)})