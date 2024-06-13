const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/surveyController');

router.get('/surveys/job-profile/:jobProfileId', surveyController.getSurveysByJobProfile);

module.exports = router;
