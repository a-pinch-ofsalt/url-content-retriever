// api/jina-reader.js

const axios = require('axios');

// Replace with your actual Jina API key
const JINA_API_KEY = process.env.JINA_API_KEY || 'your_api_key_here';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    try {
      // The Jina Reader API URL with the user-provided URL
      const readerUrl = `https://r.jina.ai/${url}`;

      // Send a GET request to the Jina Reader API
      const response = await axios.get(readerUrl, {
        headers: {
          Authorization: `Bearer ${JINA_API_KEY}`,
        },
      });

      // Return the content fetched from the API
      res.status(200).json({ content: response.data });
    } catch (error) {
      // Handle errors and return the error message
      res.status(500).json({ error: 'Failed to fetch the content', details: error.message });
    }
  } else {
    // Handle non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
