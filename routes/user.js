const express = require("express");
const { User, validateUser } = require("../model/user.js");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const router = express.Router()

router.get("/", async (req, res) => {
    const users = await User.find()
    // const token = users.generateTokens()
    // res.header('x-auth-token',token).json(users)
    
    res.json(users)

})

router.get("/:id", async (req, res) => {
 
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "invalid id" })
    const user = await User.findById(req.params.id);
      // here we check if the object id is a in our database or not  id or not 
    if (!user) return res.status(404).json({ message: "no user with the given id" })
  
    const token = user.generateTokens()
    res.header('x-auth-token',token).json(user)
    
            
    // res.json(token)
})

router.post("/", async (req, res) => {
    // first : we check if the data we send is matched to be a user or not 
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message })

 
    try {
        const newUser = new User(req.body)
        const result = await newUser.save()
        const token = result.generateTokens()
        res.header('x-auth-token',token).json(result)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }

    

});


router.put("/:id", async (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "invalid id" })

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "no user with the given id" })

    const { error } = validateUser(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })



    user.set(req.body)

    await user.save();
    res.json(user)
})



router.delete("/:id", async (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "invalid id" })

    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "no user with the given id" })

    res.json(result)
})


module.exports = router