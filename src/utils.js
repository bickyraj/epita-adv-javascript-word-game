const compareAlphabetsBetweenWords = (actualWord, tryWord) => {
  actualWord = actualWord.toLowerCase();
  tryWord = tryWord.toLowerCase();
  console.log(actualWord);
  console.log(tryWord);

  if (actualWord.length !== tryWord.length) {
    return "lenght is not equal";
  }

  let result = "";
  for (let i = 0; i< tryWord.length; i++) {
    if (actualWord[i] === tryWord[i]) {
      result += "1";
    } else if (actualWord.includes(tryWord[i])) {
      result += "0";
    } else {
      result += "x";
    }
  }

  return result;
}

module.exports = {
  compareAlphabetsBetweenWords
};