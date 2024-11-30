import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { project_name, description, due_date, priority, employee_ids } = req.body;

    try {
      // Insert the project into the project table
      const projectResult = await query(
        `INSERT INTO project (project_name, description, due_date, priority) 
         VALUES ($1, $2, $3, $4) RETURNING project_id`,
        [project_name, description, due_date, priority]
      );

      const projectId = projectResult.rows[0].project_id;

      // Insert the employee assignments
      for (const employeeId of employee_ids) {
        await query(
          `INSERT INTO project_assignment (project_id, employee_id) 
           VALUES ($1, $2)`,
          [projectId, employeeId]
        );
      }

      res.status(201).json({ message: 'Project created successfully', projectId });
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}