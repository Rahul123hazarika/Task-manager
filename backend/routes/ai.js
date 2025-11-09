// routes/ai.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// POST /api/ai/chat
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Example: using OpenAI API (replace with your API key)
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI bot failed to respond' });
  }
});

module.exports = router;
