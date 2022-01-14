const express = require("express");
const { Plan } = require("../model/plan");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.js");
const admin = require("../middleware/Admin.js");

// const admin = function (req, res, next)  {
//     console.log(req.user)
//     if (!req.user)
//     {
//         res.status(401).json({ message: "you are not admin user..............." })

//     }
// next();
// }


const router = express.Router()

router.get("/",auth,async (req, res) => {
    const plans = await Plan.find()
        .populate("users", "name email isAdmin -_id")
    res.json(plans)



})



router.get("/:id" ,auth, async (req, res) => {

    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "invalid id" })

    const plan = await Plan.findById(req.params.id)
        .populate("users", "name email isAdmin -_id");
              // here we check if the object id is a in our database or not  id or not 
    if (!plan) return res.status(404).json({ message: "no plan with the given id" })

    console.log(plan.users[0].isAdmin)
    res.json(plan)
})

router.post("/",async (req, res) => {

    // first : we check if the data we send is matched to be a user or not 
    const { error } = validatePlan(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message })
    try {
        const newPlan = new Plan(req.body)
        const result = await newPlan.save()
        res.json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

});

// subscribe
router.post("/:id",async (req, res) => {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "no plan with the given id" })

    
    try {
        const newPlan = new Plan(req.body)
        const result = await newPlan.save()
        res.json(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

});

router.put("/:id", async (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "invalid id" })

    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "no plan with the given id" })

    

    const { error } = validatePlan(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })
  

    plan.set(req.body)

    await plan.save();
    res.json(plan)
})

router.delete("/:id",admin, async (req, res) => {

    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "invalid id" })

    const result = await Plan.findByIdAndDelete(req.params.id)
                   . populate("users", "isAdmin -_id");
    
    if (!result) return res.status(404).json({ message: "no plan with the given id" })

    res.json(result)

    // show

})

module.exports = router