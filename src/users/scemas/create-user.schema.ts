import * as Joi from 'joi';
export const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(16).required()
})

