import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb'; // Adjust the import path as needed
import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('website-builder');
    const collection = db.collection('templates');
    const { id } = req.query;

    if (typeof id !== 'string') {
      res.status(400).json({ error: 'Invalid ID' });
      return;
    }

    const objectId = new ObjectId(id);

    if (req.method === 'GET') {
      // Fetch template based on ID
      try {
        const template = await collection.findOne({ _id: objectId });

        if (template) {
          res.status(200).json(template);
        } else {
          res.status(404).json({ error: 'Template not found' });
        }
      } catch (error) {
        res.status(400).json({ error: 'Invalid ObjectId' });
      }
    } else if (req.method === 'PUT') {
      // Update template based on ID
      try {
        const { name, content } = req.body;

        if (!name || !content) {
          res.status(400).json({ error: 'Name and content are required' });
          return;
        }

        const result = await collection.updateOne(
          { _id: objectId },
          { $set: { name, content } }
        );

        if (result.matchedCount === 0) {
          res.status(404).json({ error: 'Template not found' });
        } else {
          res.status(200).json({ message: 'Template updated successfully' });
        }
      } catch (error) {
        res.status(400).json({ error: 'Invalid request data' });
      }
    } else if (req.method === 'DELETE') {
      // Delete template based on ID
      try {
        const result = await collection.deleteOne({ _id: objectId });

        if (result.deletedCount === 1) {
          res.status(200).json({ message: 'Template deleted successfully' });
        } else {
          res.status(404).json({ error: 'Template not found' });
        }
      } catch (error) {
        res.status(400).json({ error: 'Invalid ObjectId' });
      }
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
}
