const mongoose = require("mongoose");
const Joi = require("joi");

const planSchema = new mongoose.Schema({
    name:{ 
        type :String,
        required: true,
        unique: true
    },
    price: {
        type :Number,
        equired: true 

    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ]
});



// validation :-
const joiSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    // users : Joi.array().required()
  })
  

const Plan = mongoose.model("plan", planSchema);

const validatePlan = (requestBody) => {
    return joiSchema.validate(requestBody)
  }

module.exports = { Plan ,validatePlan};
