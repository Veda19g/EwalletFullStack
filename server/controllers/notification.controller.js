const Notification=require("../models/notification.model");

const User = require("../models/user.model");

const getNotifications=async(req,res)=>{
    
    try{
        
        const notification=await Notification.findOne({user: req.userId})
        const unreadNotifications = notification.unread;
        if(!notification){
            res.json({
            message:"no notifications"
            })
        }
        else{
            res.json({     unreadNotifications       })
        }
    } catch(err){
        console.error(err);
    res.status(500).json({ message: "Internal server error" });
    }

}

module.exports={getNotifications}