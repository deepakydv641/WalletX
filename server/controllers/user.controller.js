import {z} from "zod";
import user from "../Schemas/user.model.js";
import jwt from"jsonwebtoken";

const schema=z.object({
    FirstName:z.string(),
    lastName:z.string(),
    email:z.string().email(),
    password:z.string().min(6)
});

const signup = async (req,res)=>{
    try {
        const {FirstName,lastName,email,password} = req.body;
    
    if(schema.safeParse(req.body).success){

        const User = await user.findOne({email:email});
        if(User){
            return res.status(400).send("This email is already in use");
        }
        
        const newUser = new user({
            firstName:FirstName,
            lastName:lastName,
            email:email,
            password:password
        })
        await newUser.save();
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
        return res.status(200).json({token,msg:"Account created successfully!"});
    }
    else{
        return res.status(400).send("Invalid data");
    }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
    
}

const login = async (req,res)=>{
    try {
    const {email,password} = req.body;
    if(schema.safeParse(req.body).success){
        const User = await user.findOne({email:email});
        if(User && User.password===password){
            const token = jwt.sign({id:User._id},process.env.JWT_SECRET);
            return res.status(200).json({token,msg:"Login successful!"});
        }
        else{
            return res.status(400).send("Invalid credentials");
        }
    }
    else{
        return res.status(400).send("Invalid data");
    }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
}

const update = async (req,res)=>{
    try {
    const {firstName,lastName,password} = req.body;
    if(!firstName && !lastName && !password){
        return res.status(400).send("No data provided");
    }
    const userId = req._id;
    const User = await user.findById(userId);
    if(!User){
        return res.status(404).send("User not found");
    }
    if(firstName && schema.safeParse({firstName}).success){
        User.firstName = firstName;
    }
    if(lastName && schema.safeParse({lastName}).success){
        User.lastName = lastName;
    }
    if(password && schema.safeParse({password}).success){
        User.password = password;
    }
    await User.save();
    return res.status(200).send("User updated successfully");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
}



export {signup,login,update};
