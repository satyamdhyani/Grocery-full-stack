import jwt from "jsonwebtoken";

const auth = async (req,res,next)=>{
    try{
        const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];
       

        if(!token){
            return res.status(401).json({
                message : "please login"
            })
        }

        const decode = await jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN );

        if(!decode){
            return res.status(401).json({
                message : "unauthorized access",
                error : true,
                success : false
            })
        }


        req.userId = decode.id;

        next();



        

        console.log("decode",decode);


    } catch(err){
        return res.status(500).json({
            message :  "Login you not have login",
            error : true,
            success : false
        })
    }
}

export default auth;