const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  options:[String]
});

const surveySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true
  },
  expires: {
    type: Date,
    required: false
  },
  status: {
    type: String,
    required: true
  },
  questions: [questionSchema]
});

module.exports = mongoose.model('Surveys', surveySchema);
