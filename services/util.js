const getDifferenceString = (wordOfTheDay = "", attemptedWord = "") => {
  if (wordOfTheDay.length !== 5 || attemptedWord.length !== 5)
    return 'XXXXX';

  const charOccurArray = Array.from({ length: 26 }, () => 0);
  const diffenenceArr = Array.from({ length: 5 }, () => "B");

  let position,
    stringLength = wordOfTheDay.length;

  for (position = 0; position < stringLength; position++) {
    if (wordOfTheDay.charAt(position) === attemptedWord.charAt(position))
      diffenenceArr[position] = "G";
  }

  for (position = 0; position < stringLength; position++) {
    if (diffenenceArr[position] !== "G") {
      charOccurArray[wordOfTheDay.charAt(position).charCodeAt(0) - 65]++;
    }
  }

  for (position = 0; position < stringLength; position++) {
    if (
      diffenenceArr[position] !== "G" &&
      charOccurArray[attemptedWord.charAt(position).charCodeAt(0) - 65] > 0
    ) {
      diffenenceArr[position] = "Y";
      charOccurArray[attemptedWord.charAt(position).charCodeAt(0) - 65]--;
    }
  }

  return diffenenceArr.join('');
};

module.exports = { getDifferenceString };
