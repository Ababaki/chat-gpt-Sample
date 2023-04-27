const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  console.log('Received message:', message);
  try {
    const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci/completions',
        {
          prompt: `User: ${message}\nChatbot: `,
          max_tokens: 50,
          n: 1,
          stop: ["User", "Chatbot"],
          temperature: 0.1,
          top_p: 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );
      
      

    const reply = response.data.choices[0].text.trim();
    res.json({ reply });
  } catch (error) {
    console.error('Error fetching GPT response:', error.message);
    res.status(500).json({ error: 'Failed to fetch GPT response' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
