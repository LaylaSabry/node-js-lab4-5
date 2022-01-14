const express = require("express");
const mongoose = require("mongoose");
const { User ,validateA } = require("../model/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const router = express.Router();




router.post("/", async (req, res) => {
    const { error } = validateA(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
//check on email 
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ message: "wrong email" })

    // const validPass = await bcrypt.compare(req.body.password, user.password)
    // if (!validPass) return res.status(401).json({ message: "wrong password" })

    const token = user.generateTokens()
    res.json({ token })

    // res.send('OK');
})







module.exports = router