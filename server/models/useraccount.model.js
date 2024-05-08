const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({

   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
   },
   balance:{
    type:Number,
    required:true
   },
   askedfrom:[{
     user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
     },
     amount:{
      type:Number,
     },
     }],
   givenTo:[{
      user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
      },
      amount:{
      type:Number
      }
      }],   
   requests:[{
      user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
      },
      amount:{
      type:Number
      },
   }],
   takenFrom:[{
      user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
      },
      amount:{
      type:Number
      }
      }],     
});

const Account=mongoose.model("Account",userSchema);

module.exports=Account;