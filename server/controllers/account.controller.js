const Account=require("../models/useraccount.model");
const Notification=require("../models/notification.model");
const User = require("../models/user.model");
const getBalance=async(req,res)=>{

       const account=await Account.findOne({
        userId:req.userId
       });

       res.json({
        balance: account.balance
       })


}

const transferBalance = async (req, res) => {
    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId });
    const from = await User.findOne({ _id: req.userId });
    const toUser = await User.findOne({ _id: to });
    
    const fromName = from.firstName + " " + from.lastName;
    const toName = toUser.firstName + " " + toUser.lastName;

    if (account.balance < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
    }

    const toAccount = await Account.findOne({ userId: to });

    if (!toAccount) {
        return res.status(400).json({ message: "Invalid account" });
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } });
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

    let notification = await Notification.findOne({ user: req.userId });

    if (!notification) {
        notification = await Notification.create({
            user: req.userId,
            read: [],
            unread: [`You have transferred ${amount} to ${toName}`]
        });
        await User.findByIdAndUpdate(req.userId, { notification: notification._id });
    } else {
        notification.unread.push(`You have transferred ${amount} to ${toName}`);
        await notification.save();
    }

    let toNotification = await Notification.findOne({ user: to });

    if (!toNotification) {
        toNotification = await Notification.create({
            user: to,
            read: [],
            unread: [`You have received ${amount} from ${fromName}`]
        });
        await User.findByIdAndUpdate(to, { notification: toNotification._id });
    } else {
        toNotification.unread.push(`You have received ${amount} from ${fromName}`);
        await toNotification.save();
    }

    res.status(200).json({ message: "Transfer successful" });
};

const loanRequest = async (req, res) => {
    const { amount, to } = req.body;

    try {
        const requestingUser = await User.findOne({ _id: req.userId });
        const receivingUser = await User.findOne({ _id: to });

        if (!requestingUser || !receivingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const loanUpdate=await Account.findOneAndUpdate({userId:req.userId},{$push:{askedfrom:{user:to,amount:amount}}});
        const requestUpdate=await Account.findOneAndUpdate({userId:to},{$push:{requests:{user:req.userId,amount:amount}}});

        if (!loanUpdate || !requestUpdate) {
            return res.status(500).json({ error: 'Failed to update accounts' });
        }

        let notification = await Notification.findOne({ user: to });

        if (!notification) {
            notification = await Notification.create({
                user: to,
                read: [],
                unread: [`${requestingUser.firstName} ${requestingUser.lastName} has requested a loan of ${amount}`]
            });
            await User.findByIdAndUpdate(to, { notification: notification._id });
        } else {
            notification.unread.push(`${requestingUser.firstName} ${requestingUser.lastName} has requested a loan of ${amount}`);
            await notification.save();
        }

        return res.status(200).json({ message: 'Loan request successful' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while processing the loan request' });
    }
}


const approveRequest=async (req,res)=>{
    const {to,amount}=req.body;
    try{
       const account=await Account.findOne({userId:req.userId});
       if(account.balance<amount){
           return res.status(400).json({message:"Insufficient balance"});
       }
         const request=await Account.findOne({userId:to});
            if(!request){
                return res.status(400).json({message:"Invalid request"});
            }
            await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}});
            await Account.updateOne({userId:to},{$inc:{balance:amount}});
            await Account.updateOne({userId:req.userId},{$pull:{requests:{user:to}}},{$push:{givenTo:{user:to,amount:amount}}});
            await Account.updateOne({userId:to},{$pull:{loan:{user:req.userId}}},{$push:{takenFrom:{user:req.userId,amount:amount}}});

            let notification=await Notification.findOne({user:req.userId});
            let toNotification=await Notification.findOne({
                user:to
            });
            if(!notification){
                notification=await Notification.create({
                    user:req.userId,
                    read:[],
                    unread:[`You have approved the loan request of ${amount}`]
                });
                await User.findByIdAndUpdate(req.userId,{notification:notification._id});
            }
            else{
                notification.unread.push(`You have approved the loan request of ${amount}`);
                await notification.save();
            }
            if(!toNotification){
                toNotification=await Notification.create({
                    user:to,
                    read:[],
                    unread:[`Your loan request of ${amount} has been approved`]
                });
                await User.findByIdAndUpdate(to,{notification:toNotification._id});
            }
            else{
                toNotification.unread.push(`Your loan request of ${amount} has been approved`);
                await toNotification.save();
            }
            res.status(200).json({message:"Loan approved"});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }
}

const getAllRequests=async(req,res)=>{
    try{

        const requests=await Account.findOne({userId:req.userId}).populate("requests.user");
        res.status(200).json({requests:requests.requests});

    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports={getBalance,transferBalance,loanRequest,approveRequest,getAllRequests};