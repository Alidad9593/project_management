import { query } from '../../lib/db';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const  projectId  = req.query.project_id; // Get projectId from request body
      // Delete from assigned_project table
      await query('DELETE FROM project_assignment WHERE project_id = $1', [projectId]);
      await query('DELETE FROM project WHERE project_id = $1', [projectId]);
      res.status(200).json({ message: 'Project deleted successfully' });
      return; // Exit after handling POST request
    }
    
    const result = await query('SELECT * FROM project'); // Adjust the query as needed
    res.status(200).json(result.rows); // Send rows to the client
  } catch (error) {
    console.error('Database fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
}