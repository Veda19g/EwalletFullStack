const  {Router}=require("express");
const {getBalance,transferBalance,loanRequest, approveRequest, getAllRequests}=require("../controllers/account.controller")
const {authMiddleware}=require("../middlewares/usermiddleware");
const accountRoutes=Router();
accountRoutes.route('/balance').get(authMiddleware,getBalance);
accountRoutes.route('/transfer').post(authMiddleware,transferBalance);
accountRoutes.route('/request').post(authMiddleware,loanRequest);
accountRoutes.route('/approve').post(authMiddleware,approveRequest);
accountRoutes.route('/getAllrequests').get(authMiddleware,getAllRequests);
module.exports=accountRoutes;