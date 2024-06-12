const surveyService = require('../services/surveyService');

async function getSurveysByJobProfile (req, res) {
  const { jobProfileId } = req.params;

  try {
    const surveys = await surveyService.getSurveysByJobProfile(jobProfileId);
    res.status(200).json(surveys);
    
  } catch (error) {
    console.error('Error fetching surveys:', error);
    res.status(500).json({ message: 'Error fetching surveys' });
  }
};

module.exports = {
  getSurveysByJobProfile
};
