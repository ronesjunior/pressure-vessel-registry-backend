const error = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  return res.status(statusCode).send({
    message: statusCode === 500 ? "Internal Server Error" : message,
  });
};

export default error;
