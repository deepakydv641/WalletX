import mong from "mongoose"

const AccountSchema = new mong.Schema({
    AccountOwnerId:{
        type:mong.Types.ObjectId,
        ref:"user"
    },
    balance:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

export default mong.model("Account",AccountSchema)