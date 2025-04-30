// routes/factcheck.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/factcheck', async (req, res) => {
  const { claim } = req.body;

  try {
    const response = await axios.get('https://factchecktools.googleapis.com/v1alpha1/claims:search', {
      params: {
        query: claim,
        key: process.env.GOOGLE_FACT_CHECK_API_KEY
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error checking the claim.' });
  }
});

module.exports = router;
