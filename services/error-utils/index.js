const errorResponse = (res, errorData) => {
  const { status, message } = errorData;

  return res.status(status).send({ message });
};

const throwIfError = ({ error, ...params }) => {
  if (error && error.status && error.message)
    throw new Error(null, { cause: error });
  
  return params;
};

module.exports = { errorResponse, throwIfError };