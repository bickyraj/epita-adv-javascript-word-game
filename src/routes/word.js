const express = require('express');
const Router = express.Router();

const WordModel = require('../models/word');
const { jsonResponse } = require('../utils');

// get all words
Router.get('/', async (req, res) => {
  const id = req.params.id;
  const words = await WordModel.find();
  return jsonResponse(res, 200, words, 'all the words fetched successfully');
});

// get specific word by id
Router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const word = await WordModel.findById(id);
  if (!word) {
    return jsonResponse(res, 400, null, 'word not found');
  } else {
    return jsonResponse(res, 200, word, 'word fetched successfully');
  }
});

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
  const word = await WordModel.findByIdAndUpdate(id, {name: newWord}, { new: true });
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
    const word = await WordModel.findByIdAndDelete(id);
    if (!word) {
      return jsonResponse(res, 404, null, 'word not found');
    } else {
      return jsonResponse(res, 200, word.name, 'word deleted successfully');
    }
  } catch (error) {
    console.error(error);
    return jsonResponse(res, 500, null, 'failed to delete word.');
  }
});

module.exports = Router;