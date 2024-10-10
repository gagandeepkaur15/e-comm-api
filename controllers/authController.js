const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res)=>  {
    try {  
    let { fullname, email, password } = req.body;

    let user = await userModel.findOne({email: email})
    if (user) {
        return res.status(409).json({
            message: "User already exists",
        });
    }

    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, async function(err, hash){
            if(err) return res.send(err.message);
            else{
                let createdUser = await userModel.create({
                    fullname,
                    email,
                    password: hash,
                }); 

                let token = generateToken(createdUser);
                res.cookie("token", token);

                res.status(201).json({
                    message: "User created successfully",
                    owner: createdUser,
                });
            }
        });
    });

} catch (err) {
    res.status(500).json({
        message: "Error creating owner",
        error: err.message,
    });
}
}