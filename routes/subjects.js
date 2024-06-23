const express = require("express");
const router = express.Router();
const subject = require("../models/subject");

router.post("/create/subject", async (req, res) => {
    try {
        const newSubject = new subject(req.body);
        await newSubject.save();

        res.status(201).json({
            success: true,
            data: newSubject,
            message: "Subject uploaded to database successfully",
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message,
            message: "Failed to upload subject to database",
        });
    }
});

router.get("/get/subject", async(req,res)=>{
    try{
        const subjects = await subject.find();

        if(!subjects) return res.status(404).json({
            success : false,
            message : "Subject not found!",
        })
        res.status(201).json({
            success : true,
            message : `Subject  is successfully find`,
            subjects,
        })
    }catch(err) {
        res.status(400).json({
            status : false,
            message : `error is ${err.message}`

        })
    }

    }
)

module.exports = router;
