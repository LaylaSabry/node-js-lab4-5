const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 55
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { 
    type: String,
    equired: true 
  },
  age: {
    type: Number,
    required: true
  },
  isAdmin: Boolean,
});

userSchema.methods.generateTokens = function()
{
  const token = jwt.sign(
    {
      _id:this._id ,
      //  isAdmin :this.isAdmin
      }, "pprocess.env.SECRET_KEY")

      return token ;
}

// validation :-
const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(12).required(),
  age: Joi.number().required(),
  isAdmin: Joi.boolean().required(),
})

const User = mongoose.model("user", userSchema);

const validateUser = (requestBody) => {
  return joiSchema.validate(requestBody)
}

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(12).required(),
})


const validateA = (requestBody) => {
  return authSchema.validate(requestBody)
}


module.exports = { User, validateUser ,validateA};
