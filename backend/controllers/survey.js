let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let Surveys = require('../models/survey');
let SurveyResponses  = require('../models/survey.response');

module.exports.displaysurveyList = (req, res, next) => {
  Surveys.find({},(err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.status(200).json(surveyList);
        }
    });
}

exports.postAddSurvey = ((req, res, next) => {
  const Survey = new Surveys({
    name: req.body.name,
    title: req.body.title,
    created: req.body.created,
    expires: req.body.expires,
    status: req.body.status,
    questions: req.body.questions
  });
  Survey.save().then(createdSurvey => {
    console.log(createdSurvey);
    res.status(201).json({
      message: "Survey added successfully",
      survey: {
        ...createdSurvey,
        id: createdSurvey._id
      }
    });
  });
}
);


module.exports.addResponse = (req, res, next) => {

  const Response = new SurveyResponses({
    surveyid: req.body.surveyid,
      createdon: Date.now(),
      questions: req.body.questions
  });

  console.log(req.body);
  Response.save(function (err) {
    if(err)
    {
        console.log(err);
        res.status(400).json({success: false, msg: 'response not added'});
    }
    else
    {
      res.status(200).json({success: true, msg: 'successfully Added New response'});
    }
  });
}

module.exports.processAddPage = (req, res, next) => {
    let newsurvey = survey({
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });

    survey.create(newsurvey, (err, survey) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
          res.status(200).json({success: true, msg: 'Successfully Added New survey'});
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
  let id = req.params.id;


  Surveys.findById(id, function(err, survey) {
      if (err) {

        res.json(err);
      }
      else {
            console.log(id);
            res.status(200).json(survey);
      }
    });
}

module.exports.processEditPage = (req, res, next) => {
  let id = req.params.id

  let updatedsurvey = Surveys({
    name: req.body.name,
    title: req.body.title,
    created: req.body.created,
    expires: req.body.expires,
    status: req.body.status,
    questions: req.body.questions
  });

  Surveys.updateOne(
    {_id: id},  // <-- find stage
    { $set: {                // <-- set stage
      name: req.body.name,
      title: req.body.title,
      created: req.body.created,
      expires: req.body.expires,
      status: req.body.status,
      questions: req.body.questions
      }}).then(result => {
    res.status(200).json({ message: "Update successful!"});
  });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Surveys.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
          res.status(200).json({success: true, msg: 'Successfully Deleted survey'});
        }
    });
}

module.exports.getResponses= (req, res, next) => {
  let id = req.params.id;
  SurveyResponses.find({surveyid : id},(err, surveyresponseList) => {
    if(err)
    {
        return console.error(err);
    }
    else
    {
        res.status(200).json(surveyresponseList);
    }
});
}
