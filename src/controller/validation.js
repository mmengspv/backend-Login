import Joi from "@hapi/joi";

//Register validation
export const registerValidation = (data) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(data);
};

//Login validation
export const loginValidation = (data) => {
  const loginSchema = Joi.object().keys({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });

  return loginSchema.validate(data)
};
