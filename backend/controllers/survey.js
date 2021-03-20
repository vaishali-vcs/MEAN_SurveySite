let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let survey = require('../models/survey');

module.exports.displaysurveyList = (req, res, next) => {
    survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(surveyList);

            /*
            res.render('survey/list', 
            {title: 'surveys', 
            surveyList: surveyList, 
            displayName: req.user ? req.user.displayName : ''});      
            */

            res.json(surveyList);
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    /*
    res.render('survey/add', {title: 'Add survey', 
    displayName: req.user ? req.user.displayName : ''});
    */
   
    res.json({success: true, msg: 'Succesfully Displayed Add Page'});
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
            // refresh the survey list
            //res.redirect('/survey-list');

            res.json({success: true, msg: 'Successfully Added New survey'});
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
            //show the edit view
            /*
            res.render('survey/edit', {title: 'Edit survey', survey: surveyToEdit, 
            displayName: req.user ? req.user.displayName : ''});
            */

            res.json({success: true, msg: 'Successfully Displayed survey to Edit', survey: surveyToEdit});
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
            // refresh the survey list
            //res.redirect('/survey-list');

            res.json({success: true, msg: 'Successfully Edited survey', survey: updatedsurvey});
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
             // refresh the survey list
             //res.redirect('/survey-list');

             res.json({success: true, msg: 'Successfully Deleted survey'});
        }
    });
}