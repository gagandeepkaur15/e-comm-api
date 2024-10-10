module.exports = async (req, res, next)=>{
    try{
        if(!req.cookies.token){
            return res.status(401).json({
                message: "Please log in",
                redirectTo: "/",
            });
        }

        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel.findOne({ email: decoded.email }).select("-password");

        req.user = user;

        next();
    }
    catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message,
            redirectTo: "/",
        });
    }
};