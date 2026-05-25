const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req,res)=>{
   res.send("Backend Running");
});

app.post("/pay", async(req,res)=>{

   try{

      const response = await axios.post(
         "https://api.jazpays.com/v1/create",
         {
            merchant_id:
              process.env.MERCHANT_ID,

            api_key:
              process.env.API_KEY,

            amount:
              req.body.amount,

            merchant_order_no:
              "ORD_" + Date.now(),

            callback_url:
              "https://paymentuu.onrender.com/callback"
         }
      );

      res.json(response.data);

   }catch(err){

      res.status(500).json({
         error: err.message
      });

   }

});

app.post("/callback",(req,res)=>{

   console.log(req.body);

   res.send("success");

});

app.listen(3000,()=>{
   console.log("Server Started");
});
