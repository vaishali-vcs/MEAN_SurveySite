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
            res.status(200).json({success: true, msg: 'Successfully Displayed survey to Edit', surveyList});
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
      createdby: req.body.createdby,
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

    survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
          res.status(200).json({success: true, msg: 'Successfully Displayed survey to Edit', survey: surveyToEdit});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedsurvey = survey({
        "_id": id,
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });

    survey.updateOne({_id: id}, updatedsurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.status(200).json({success: true, msg: 'Successfully Edited survey', survey: updatedsurvey});
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    survey.remove({_id: id}, (err) => {
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

