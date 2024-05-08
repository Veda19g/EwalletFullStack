const  {Router}=require("express");
const {getNotifications}=require("../controllers/notification.controller");
const {authMiddleware}=require("../middlewares/usermiddleware");
const notificationRoutes=Router();

notificationRoutes.route('/get-notifications').get(authMiddleware,getNotifications);
module.exports=notificationRoutes;