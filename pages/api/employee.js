import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const result = await query('SELECT id, name, email FROM employee');
      res.status(200).json(result.rows); // Send the employee data as JSON
    } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  else if (req.body.option === 1) { // Add Employee
    const {name, email, phone_no, position, start_date, username, password, option } = req.body;
    
      try {
        // Check if the username already exists
        const usernameCheck = await query('SELECT COUNT(*) FROM employee WHERE username = $1', [username]);
        if (parseInt(usernameCheck.rows[0].count) > 0) {
          return res.status(400).json({ error: 'Username already exists' });
        }

        // Insert the new employee record
        const result = await query(
          `INSERT INTO employee (name, role, email, phone_number, username, password, start_date) 
           VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
          [name, position, email, phone_no, username, password, start_date]
        );

        res.status(201).json({ message: 'Employee added successfully', employee: result.rows[0] });
      } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    
    
  }

  else if(req.body.option === 2)  // Delete Employee
  {
    const { id } = req.body;
    try {
      // Delete the employee record
      const result = await query('DELETE FROM employee WHERE id = $1', [id]);
      if (result.rowCount > 0) {
        res.status(200).json({ message: 'Employee deleted successfully' });
      } else {
        res.status(404).json({ error: 'Employee not found' });
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
