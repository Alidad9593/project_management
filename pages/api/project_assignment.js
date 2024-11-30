import { query } from '../../lib/db';

export default async function handler(req, res) {
  const { project_id } = req.query; // Get project_id from query parameters

  if (!project_id) {
    return res.status(400).json({ error: 'Project ID is required' });
  }

  try {
    const result = await query(
      'SELECT employee_id FROM project_assignment WHERE project_id = $1',
      [project_id]
    );
    res.status(200).json(result.rows); // Send rows to the client
  } catch (error) {
    console.error('Database fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch project assignments api' });
  }
}