import { query } from '../../lib/db';

export default async function handler(req, res) {
    try {
        const result = await query('SELECT id, name, email FROM employee');
        res.status(200).json(result.rows); // Send the employee data as JSON
      } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
