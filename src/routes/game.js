const express = require('express');
const WordModel = require('../models/word');
const GameModel = require("../models/game");
const TryModel = require("../models/try");
const { compareAlphabetsBetweenWords, jsonResponse } = require('../utils');

const Router = express.Router();

const isLogged = (request, response, next) => {
  if (request.session.user) {
    next();
  } else {
    return response.status(500).json({ 'msg': "not logged !" })
  }
}

// create a game
Router.get('/new', isLogged, async (request, response) => {
  // get a random words from the words.
  const word = await WordModel.aggregate([{
    $sample: { size: 1 }
  }]);

  console.log(word);
  if (word.length < 1) {
    return response.status(200).json({
      "message": "no game created yet."
    });
  } else {
    const user = request.session.user;
    const game = new GameModel({
      word: word[0]._id,
      user: user._id,
      tries: []
    });
    await game.save();
    return response.status(200).json({
      'word': word[0].name,
      "game": game,
      "message": "game created"
    });
  }

});

Router.post('/verify', isLogged, async (request, response) => {
  // get a random words from the words.
  const { game_id, word } = request.body;
  const gameModel = await GameModel.findById(game_id).populate('word tries user');
  const wordModel = gameModel.word;
  if (!wordModel || !gameModel) {
    return response.status(500).json({
      "message": "something went wrong. Please try again."
    });
  }
  const resultData = compareAlphabetsBetweenWords(wordModel.name, word);
  // check lenght of the result comparison
  if (resultData.lenghtValid) {
    let newTry = await new TryModel({
      word: wordModel._id,
      result: resultData.result
    }).save();

    gameModel.tries.push(newTry);

    try {
      const updatedGame = await gameModel.save();
      return response.status(200).json({
        "word": word,
        "response": (resultData.success) ? "you found the word" : resultData.result,
        "game": updatedGame
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    return response.status(500).json({
      "word": word,
      "response": resultData.result,
    });
  }
});

Router.get('/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const game = await GameModel.findOne({ _id: id });

    return response.status(200).json({
      "msg": game
    });
  } catch (error) {
    return response.status(500).json({
      "error": error.message
    });
  }
})

Router.post('/verif', isLogged, (request, response) => {
  if (typeof request.body.word === 'undefined') {
    return response.status(500).json({
      "msg": "You have to send 'word' value"
    });
  }

  if (request.body.word === search) {
    return response.status(200).json({
      "result": "You find the word !"
    });
  }

  return response.status(500).json({
    "result": "You don't find the word !"
  });
})

module.exports = Router;