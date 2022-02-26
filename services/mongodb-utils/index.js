const { MongoClient } = require("mongodb");
const { throwIfError } = require("../error-utils.js");

const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_CLUSTER_URL } = process.env;
const uri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER_URL}/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

async function getWordOfTheDay() {
  const databaseName = "SIX_GUESSES";
  const collectionName = "WORD_OF_THE_DAY";

  await client.connect();
  const collection = client.db(databaseName).collection(collectionName);
  const wordOfTheDayDoc = await collection.findOne({});

  return throwIfError(wordOfTheDayDoc);
}

async function checkIfWordExists(attemptedWord = '') {
  let doesWordExist = false;
  const databaseName = "SIX_GUESSES";
  const collectionName = "FIVE_LETTER_ENG_WORDS";

  await client.connect();
  const collection = client.db(databaseName).collection(collectionName);
  const matchingWord = await collection.findOne({ value: attemptedWord });

  if (matchingWord && matchingWord.value === attemptedWord)
    doesWordExist = true;

  return { doesWordExist };
};

module.exports = { getWordOfTheDay, checkIfWordExists };

// const { MongoClient } = require("mongodb");

// const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_CLUSTER_URL } = process.env;
// const uri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER_URL}/test?retryWrites=true&w=majority`;
// const client = new MongoClient(uri);

// async function getWordOfTheDay() {
//   const databaseName = "SIX_GUESSES";
//   const collectionName = "WORD_OF_THE_DAY";

//   try {
//     await client.connect();
//     const collection = client.db(databaseName).collection(collectionName);
//     const wordOfTheDayDoc = await collection.findOne({});

//     const { value, error } = wordOfTheDayDoc;

//     if (1)
//       console.log(a.b);
//     return { value, error };
//   } catch (error) {
//     console.log({ error });
//     return { error };
//   }
// }

// async function checkIfWordExists(attemptedWord = '') {
//   let doesWordExist = false;
//   const databaseName = "SIX_GUESSES";
//   const collectionName = "FIVE_LETTER_ENG_WORDS";

//   try {
//     await client.connect();
//     const collection = client.db(databaseName).collection(collectionName);
//     const matchingWord = await collection.findOne({ value: attemptedWord });

//     if (matchingWord && matchingWord.value === attemptedWord)
//       doesWordExist = true;

//     return { doesWordExist };
//   } catch (error) {
//     return { error };
//   }
// };

// module.exports = { getWordOfTheDay, checkIfWordExists };
