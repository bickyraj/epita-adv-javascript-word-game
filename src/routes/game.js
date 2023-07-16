const express = require('express');
const WordModel = require('../models/word');
const GameModel = require("../models/game");
const { compareAlphabetsBetweenWords } = require('../utils');

const Router = express.Router();

const isLogged = (request, response, next) => {
    if (request.session.user) {
        console.log('test');
        next();
    } else {
        return response.status(500).json({'msg': "not logged !"})
    }
}

Router.get('/new', async (request, response) => {
  // get a random words from the words.
  const word = await WordModel.aggregate([{
    $sample: { size: 1 }
  }]);

  return response.status(200).json({ 'data': {
    id: word[0]._id,
    word: word[0].name
  }})
});

Router.post('/try', async (request, response) => {
  // get a random words from the words.
  const { id, word } = request.body; 

  const wordModel = await WordModel.findById(id);
  console.log(wordModel);

  const result = compareAlphabetsBetweenWords(wordModel.name, word);

  return response.status(200).json({
    "word": word,
    "response": result,
  })
});

// Router.post('/', async (request, response) => {
//     const word = await WordModel.aggregate([{
//         $sample: {size: 1}
//     }]);

//     let game = new GameModel({
//         word: word[0]._id,
//         tries: [],
//         user: request.session.user._id
//     });

//     try {
//         await game.save();

//         game = await GameModel.find({
//             _id: game._id
//         }).populate('user').populate('word')

//         return response.status(200).json({
//             "msg": game
//         });
//     } catch (error) {
//         return response.status(500).json({
//             "error": error.message
//         });
//     }
// });

Router.get('/:id', async (request, response) => {
    const {id} = request.params;

    try {
        const game = await GameModel.findOne({_id: id});

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
    // get the value from the user

    // ge the value searched by getting the game

    // make the verification

    // send the result


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