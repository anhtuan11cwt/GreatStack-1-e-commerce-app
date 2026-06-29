const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const firstError = result.error.errors[0];
    return res.status(400).json({
      data: null,
      message: firstError.message,
      success: false,
    });
  }
  req.body = result.data;
  next();
};

export default validate;
