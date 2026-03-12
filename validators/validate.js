const joi = require("joi");

const loginSchema = joi.object({

  email: joi.string().email({tlds: {allow:false}}).required(),
  password: joi.string().min(6).required()
})

const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().min(6).required(),
  avatar: joi.required(),
  park: joi.required()
});

module.exports = {
    loginSchema,
    userSchema
}
