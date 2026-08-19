import jwt from "jsonwebtoken";

const authMiddleware = (req,res,next)=>{
    let token = req.header("Authorization");
    if(!token){
        return res.status(401).send("Access denied. No token provided.");
    }
    token = token.replace("Bearer ","");
    const validate = jwt.verify(token,process.env.JWT_SECRET);  // because we form the token using the user id and secret key so validate will id as a property
    if(!validate){
        return res.status(401).send("You are not authorized to access this resource.");
    }
    req._id = validate.id;
    next();
}

export default authMiddleware;
