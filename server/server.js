require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { AzureOpenAI } = require('openai');
const { AzureKeyCredential } = require('@azure/core-auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Azure OpenAI configuration
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4';
const apiVersion = '2025-03-01-preview'; // Specify the API version

// Initialize the OpenAI client
const openAiClient = new AzureOpenAI({
  apiKey,
  endpoint,
  apiVersion,
  deployment: deploymentName
});

// AI endpoint
app.post('/api/ai', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await openAiClient.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message }
      ],
      max_tokens: 500
    });

    return res.json({ 
      reply: response.choices[0]?.message?.content || 'No response generated' 
    });
  } catch (error) {
    console.error('Error calling Azure OpenAI:', error);
    return res.status(500).json({ error: 'Error processing your request' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
