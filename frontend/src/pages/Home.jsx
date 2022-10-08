import React from 'react'
import "../styles/Home.css"
import axios from "axios"
import { useState } from 'react'
// import Razorpay from "razorpay"
export const Home = () => {

//  const [totalprice,setTotalprice]=useState(0)
 const [id,setId]=useState("")
  const handleBuy= async(price,title)=>{
  console.log(price,title)

  // const {data:{order} }=await axios.post("http://localhost:4000/checkout",{
  //   price
  // })
  // console.log(order)
  axios({
    method:"post",
    url:"http://localhost:4000/checkout",
    data:{
        amount:price,
        title:title
    }
  })
  .then((res)=>{setId(res.data.id)})
  
console.log(id)
  var options = {
    key: "rzp_test_xHTd0COEbT2eHr", // Enter the Key ID generated from the Dashboard
    amount: price*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: id,
    description: "Test Transaction",
    image: "https://example.com/your_logo",
    order_id:id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    callback_url: "http://localhost:4000/paymentverification",
    prefill: {
        name: "Avinash kumar",
        email: "avinash.kumar@example.com",
        contact: "9999999999"
    },
    notes: {
        address: "Razorpay Corporate Office"
    },
    theme: {
        "color": "#3399cc"
    }
};
const razor = new window.Razorpay(options);

    razor.open();

  // console.log(window)
  
  }
  return (
    <div id='main'>
        <div>
            <img src="https://cdna.lystit.com/photos/8e89-2014/06/12/express-purple-fitted-striped-dress-shirt-product-1-20745767-1-376355469-normal.jpeg" alt="Formal shirt"></img>
            <p>Formal shirt</p>
            <p>₹2000</p>
            <button onClick={()=>{handleBuy(2000,"Formal_shirt")}}>Buy</button>
        </div>
        <div>
            <img src="https://ae01.alicdn.com/kf/HTB19g7jVSzqK1RjSZPcq6zTepXaD/Men-Dress-Shirts-2019-New-style-Summer-flowers-shirt-Short-Sleeve-Floral-Casual-Men-100-Mercerized.jpg" alt="printed shirt"></img>
            <p>Printed shirt</p>
            <p>₹1000</p>
            <button onClick={()=>{handleBuy(1000,"Printed_shirt")}}>Buy</button>
        </div>
    </div>
  )
}
