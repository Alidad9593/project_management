import { query } from '../../lib/db';

export default async function handler(req, res) {
  try {
    const result = await query('SELECT * FROM employee');
    console.log(result);
    res.status(200).json(result.rows); // Send rows to the client
  } catch (error) {
    console.error('Database fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
}
