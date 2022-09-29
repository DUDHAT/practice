const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
var mongoose = require("mongoose");

const validateCreateUser = async (req, res, next) => {
  const { body } = req;
  console.log(body);
  const blogSchema = Joi.object().keys({
    fastname: Joi.string()
      .regex(/^[a-zA-Z][a-zA-Z\\s]+$/)
      .required(),
    lastname: Joi.string()
      .regex(/^[a-zA-Z][a-zA-Z\\s]+$/)
      .required(),
    email: Joi.string().email().required(),
    phone_no: Joi.string()
      .regex(/^[0-9]{10}$/)
      .required(),
    age: Joi.string().min(2),
  });

  const { error } = blogSchema.validate(body);
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(",");
    res.status(422).json({ error: message });
  }
};

const UseridValidate = async (req, res, next) => {
  const a = req.params.id;

  body = {
    id: a,
  };

  console.log("body" + body);

  const blogSchemas = Joi.object().keys({
    id: Joi.objectId(),
  });

  const { error } = blogSchemas.validate(body);

  const valid = error == null;

  console.log(valid);

  //   var isValid = mongoose.Types.ObjectId.isValid(a);
  if (valid) {
    console.log("helo");
    next();
  } else {
    console.log("hello");

    const { details } = error;

    const message = details.map((i) => i.message).join(",");

    res.status(422).json({ error: message });
  }
};

module.exports = {
  validateCreateUser,
  UseridValidate,
};
