const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

const surveyResponseSchema = new Schema({

  surveyid: {
    type: String,
    required: true
  },
  createdon: {
    type: Date,
    required: true
  },
  questions: [ResponseSchema]
});

module.exports = mongoose.model('SurveyResponses', surveyResponseSchema, collection = 'SurveyResponses');
