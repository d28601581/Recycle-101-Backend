const Joi = require('@hapi/joi');

//Registration validation
const signUpValidation = data => {
    const schema = {
        userName: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required()
    }

    return Joi.validate(data, schema)
}

//Registration validation
const logInValidation = data => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required()
    }

    return Joi.validate(data, schema)
}

module.exports.signUpValidation = signUpValidation;
module.exports.logInValidation = logInValidation;