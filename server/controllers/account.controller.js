import Account from "../Schemas/account.model.js"
import mong from "mongoose"

const getBalance = async (req,res)=>{
    try {
        const account = await Account.findOne({AccountOwnerId: req._id})
        if(!account){
            return res.status(404).send("Account not found");
        }
        return res.status(200).json({balance: account.balance});
    } catch (error) {
        console.log("Error in getBalance: ",error);
        return res.status(500).send("Internal server error");
    }
}

const transfer = async (req,res)=>{
    try {
        const session = new mong.Session();

        await session.startTransaction();
        // transaction logic here
        const {amount} = req.body();
        const to = req.query.id;
        const userId = req._id;

        let sender = await Account.findOne({AccountOwnerId:userId});
        if(sender.amount<amount){
            return res.status(409).json({msg:"Insufficient Balance"});
        }
        sender.amount-=amount;
        await sender.save();

        let receiver = await Account.findOne({AccountOwnerId:to});
        receiver.amount+=amount;
        await receiver.save();

        await session.commitTransaction();

        return res.status(200).json({msg:"Transfer successful"});
    } catch (error) {
        console.log("Error in transfer: ",error);
        return res.status(500).send("Internal server error");
    }
}

export {getBalance, transfer}