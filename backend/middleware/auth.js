import jwt from "jsonwebtoken";

const authMiddleware  = async (req,res,next)=>{

    const {token} = req.headers
    if(!token){
        return res.json({success:false,message: "Not uthorized Login again"})
    }
    try {
        const jwt_decode = jwt.verify(token,process.env.JWT_SECRET);  
        req.body.userId= jwt_decode.id;
    } catch (error) {
        console.log(error)
        return res.json({success:false,message: "Not uthorized Login again"})
    }

    next();

}

export default authMiddleware;