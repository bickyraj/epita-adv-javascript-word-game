const compareAlphabetsBetweenWords = (actualWord, tryWord) => {
  actualWord = actualWord.toLowerCase();
  tryWord = tryWord.toLowerCase();
  let result = "";
  let success = false;
  let lenghtValid = true;
  if (actualWord.length !== tryWord.length) {
    result = "lenght is not equal";
    lenghtValid = false;
  } else {
    for (let i = 0; i < tryWord.length; i++) {
      if (actualWord[i] === tryWord[i]) {
        result += "1";
      } else if (actualWord.includes(tryWord[i])) {
        result += "0";
      } else {
        result += "x";
      }
    }
  
    const pattern = /^1+$/;
    const isValid = pattern.test(result);
  
    if (isValid) {
      success = true;
    }
  }


  return {
    success: success,
    lenghtValid: lenghtValid,
    result: result
  };
}

const jsonResponse = (res, status, data, message) => {
  return res.status(status).json({
    data: data,
    message: message
  });
}

module.exports = {
  compareAlphabetsBetweenWords,
  jsonResponse
};