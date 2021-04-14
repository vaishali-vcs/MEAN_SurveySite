let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');
let passport = require('passport');

let checkAuth = require("../middleware/check-auth");
let surveyController = require('../controllers/survey');

/* GET Route for the survey List page - READ Operation */
router.get('/', surveyController.displaysurveyList);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', checkAuth, surveyController.postAddSurvey);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', checkAuth, surveyController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', checkAuth, surveyController.processEditPage);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', checkAuth, surveyController.performDelete);

/* GET to add a Survey Response  - CREATE Operation */
router.post('/response/add', surveyController.addResponse);

/* GET to get Survey Responses - READ Operation */
router.get('/response/:id', checkAuth, surveyController.getResponses);

/* POST to add Contact - CREATE Operation */
router.post('/contact/add', surveyController.addContact);

/* POST Route for displaying the Survey Response page - READ Operation */
router.get('/read/:id', surveyController.displayEditPage);

module.exports = router;
