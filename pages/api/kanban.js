import { query } from '../../lib/db'; // Adjust the import based on your db setup

export default async function handler(req, res) {
    if (req.method === "POST") {
        const emp_id  = req.body.id;  // Get employee ID from query string (e.g., /api/kanban?emp_id=1)

        if (!emp_id) {
            return res.status(400).json({ error: 'Employee ID is required' });
        }

        try {
            // Query to get Kanban data with project and employee details, filtered by employee ID
            const result = await query(`
                SELECT 
                    kb.kanban_id,
                    p.project_name,
                    p.description AS project_description,
                    kb.status,
                    STRING_AGG(e.name, ', ') AS team_members
                FROM 
                    kanban_board kb
                JOIN 
                    project p ON kb.project_id = p.project_id
                JOIN 
                    employee e ON kb.employee_id = e.id
                WHERE 
                    e.id = $1  -- Filter by employee ID
                GROUP BY 
                    kb.kanban_id, p.project_name, p.description, kb.status
                ORDER BY 
                    kb.kanban_id;
            `, [emp_id]);  // Pass emp_id as a parameter to the query

            // Return the data as JSON
            res.status(200).json({ kanban: result.rows });
        } catch (error) {
            console.error('Error fetching kanban:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
