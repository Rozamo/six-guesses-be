const STATUS_MAP = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_ACCEPTABLE: 406,
};

const ERROR_STATUS_MAP = {
  WORD_DOES_NOT_EXIST: {
    status: STATUS_MAP.NOT_ACCEPTABLE,
    message: 'Word does not exist',
  },
};

module.exports = { ERROR_STATUS_MAP, STATUS_MAP };