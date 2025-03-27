import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'GET') {
      // @ts-ignore - Access the tank data
      const tankData = typeof window !== 'undefined' && window.getTankData ? window.getTankData() : [];
      res.status(200).json(tankData);
    } else if (req.method === 'POST') {
      // Forward the data to the backend publisher
      fetch('http://localhost:3001/update-tanks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
      });
      res.status(200).json({ message: 'Data forwarded to backend' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to handle tank data' });
  }
}
