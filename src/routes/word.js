const express = require('express');
const Router = express.Router();

const WordModel = require('../models/word');
const { jsonResponse } = require('../utils');

// create word
Router.post('/', async (request, response) => {
  const { word } = request.body;

  const wordModel = new WordModel({
    name: word
  });

  try {

    await wordModel.save();
    return jsonResponse(response, 200, word, "word has been created");

  } catch (error) {
    return jsonResponse(response, 500, null, error.message);
  }
});

// edit word
Router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const newWord = req.body.word;
  const word = await WordModel.findByIdAndUpdate(id, newWord, { new: true });
  if (!word) {
    return jsonResponse(res, 400, null, 'word not found');
  } else {
    return jsonResponse(res, 200, word.name, 'word udpated successfully');
  }
});

// delete word
Router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedWord = await WordModel.findByIdAndDelete(id);
    if (!deletedWord) {
      return jsonResponse(res, 404, null, 'word not found');
    } else {
      return jsonResponse(res, 200, deletedWord.name, 'word deleted successfully');
    }
  } catch (error) {
    console.error('Failed to delete word:', error);
    return jsonResponse(res, 500, null, 'failed to delete word.');
  }
});

module.exports = Router;