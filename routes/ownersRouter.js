const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-model");

// Set the environment: set NODE_ENV=development   

if(process.env.NODE_ENV === "development"){
    router.get("/dev", (req, res)=>{
        res.send("Development Route");
    });
}

router.get("/", (req, res)=>{
    res.send("Owners Route");
});

router.post("/create", async (req, res)=>  {
    try {
    let { fullname, email, password } = req.body;

    let createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
    }); 
    res.status(201).json({
        message: "Owner created successfully",
        owner: createdOwner,
    });
} catch (err) {
    res.status(500).json({
        message: "Error creating owner",
        error: err.message,
    });
}
});

module.exports = router;