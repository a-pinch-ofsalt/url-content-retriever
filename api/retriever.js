const axios = require('axios');

// Replace with your actual Jina API key
const JINA_API_KEY = process.env.JINA_API_KEY || 'your_api_key_here';

export default async function handler(req, res) {
  console.log("Handler started");
  console.log("Request method:", req.method);
  
  if (req.method === 'POST') {
    console.log("POST request received");
    const { url } = req.body;
    console.log("URL received:", url);

    if (!url) {
      console.error("Error: URL is missing in request body");
      return res.status(400).json({ error: 'URL is required' });
    }

    try {
      // The Jina Reader API URL with the user-provided URL
      const readerUrl = `https://r.jina.ai/${url}`;
      console.log("Formatted Reader API URL:", readerUrl);

      // Send a GET request to the Jina Reader API
      const response = await axios.get(readerUrl, {
        headers: {
          Authorization: `Bearer ${JINA_API_KEY}`,
        },
      });

      console.log("Response from Jina Reader API received successfully");
      console.log("Response data:", response.data);

      // Return the content fetched from the API
      res.status(200).json({ content: response.data });
    } catch (error) {
      console.error("Error occurred while fetching content from Jina Reader API:", error);
      res.status(500).json({ error: 'Failed to fetch the content', details: error.message });
    }
  } else {
    console.error(`Error: Unsupported request method ${req.method}`);
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
