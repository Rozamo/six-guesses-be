var express = require("express");
const { ERROR_STATUS_MAP } = require("../../data/error-statuses");
const { errorResponse } = require("../../services/error-utils.js");
var router = express.Router();
const { getWordOfTheDay, checkIfWordExists } = require("../../services/mongodb-utils");
const { getDifferenceString } = require("../../services/util");

router.get("/", async function (req, res, next) {
  try {
    const { attemptedWord } = req?.body;
    const { doesWordExist } =  await checkIfWordExists(attemptedWord);

    if (!doesWordExist) return errorResponse(res, ERROR_STATUS_MAP.WORD_DOES_NOT_EXIST);

    const { value: wordOfTheDay } = await getWordOfTheDay();

    const differenceString = getDifferenceString(wordOfTheDay, attemptedWord);
    return res.status(200).send({ differenceString });
  } catch (error) {
    if (error.cause && error.cause.status && error.cause.message)
      return errorResponse(res, error.cause)

    return res.status(100).send({ message: 'JSON.stringify(error)' });
  }
});

module.exports = router;

// var express = require("express");
// var router = express.Router();
// const { getWordOfTheDay, checkIfWordExists } = require("../../services/mongodb-utils");

// router.get("/", async function (req, res, next) {
//   try {
//     const { attemptedWord } = req?.body;
//     const { doesWordExist, error: checkIfWordExistsError } =  await checkIfWordExists(attemptedWord);

//     if (!doesWordExist) return res.status(400).send({ message: "Word does not exist" });

//     if (checkIfWordExistsError)
//       return res.status(checkIfWordExistsError.status).send({ message: checkIfWordExistsError.message });

//     const { value: wordOfTheDay, error } = await getWordOfTheDay();

//     if (error && error.status && error.message)
//       return res.status(error.status).send({ message: error.message });

//     res.send(wordOfTheDay);
//   } catch (error) {
//     return res.status(400).send({ message: JSON.stringify(error) });
//   }
// });

// module.exports = router;
