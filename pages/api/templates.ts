import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('website-builder');
    const collection = db.collection('templates');

    if (req.method === 'POST') {
      // Store a new template
      const { content,name } = req.body;
      const result = await collection.insertOne({ content, name, createdAt: new Date() });
      res.status(201).json(result);
    } else if (req.method === 'GET') {
      // Fetch all templates
      const templates = await collection.find({}).toArray();
      res.status(200).json(templates);
    } else {
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
}
