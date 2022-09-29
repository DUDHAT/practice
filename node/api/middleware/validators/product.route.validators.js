const Joi = require("joi");

const validateCreateUser = async (req, res, next) => {
  const { body } = req;
  console.log(body);
  const blogSchema = Joi.object().keys({
    name: Joi.string().required(),
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

module.exports = {
  validateCreateUser,
};
