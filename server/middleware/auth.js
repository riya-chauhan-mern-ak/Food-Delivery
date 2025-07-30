import jwt from "jsonwebtoken";

const authMiddleware = async(req,res,next) => {
    const {token} = req.headers;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Not Authorized Login Again!"
        })
    }
    try {
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET);
        console.log('decodee================================',decodeToken);
        
        req.userId = decodeToken.id;
        console.log('decodee================================', req.userId);
        next()
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

export default authMiddleware