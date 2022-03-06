var express = require("express");
const { ERROR_STATUS_MAP, STATUS_MAP } = require("../../data/error-statuses");
const { errorResponse } = require("../../services/error-utils");
var router = express.Router();
const {
  getWordOfTheDay,
  checkIfWordExists,
} = require("../../services/mongodb-utils");
const { getDifferenceString } = require("../../services/util");

router.get("/", async function (req, res, next) {
  try {
    const { attemptedWord } = req?.body;
    const { doesWordExist } = await checkIfWordExists(attemptedWord);

    if (!doesWordExist)
      return errorResponse(res, ERROR_STATUS_MAP.WORD_DOES_NOT_EXIST);

    const { value: wordOfTheDay } = await getWordOfTheDay();

    const differenceString = getDifferenceString(wordOfTheDay, attemptedWord);
    return res.status(STATUS_MAP.OK).send({ differenceString });
  } catch (error) {
    if (error.cause && error.cause.status && error.cause.message)
      return errorResponse(res, error.cause);

    return res
      .status(STATUS_MAP.BAD_REQUEST)
      .send({ message: JSON.stringify(error?.message) });
  }
});

module.exports = router;
