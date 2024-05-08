const  {Router}=require("express");
const userRoutes=require("./user.routes");
const accountRoutes=require("./accounts.route");
const notificationRoutes = require("./notifications.route");
const backendroutes=Router();

backendroutes.use('/user',userRoutes);
backendroutes.use('/account',accountRoutes);
backendroutes.use('/notifications',notificationRoutes);
module.exports=backendroutes;