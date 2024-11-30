import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const result = await query('SELECT id, name, email, role, phone_number FROM employee');
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

  else if(req.body.option === 3)  //Edit Employee
  {
      const { id, email, phone_number, role} = req.body;
      try {
        // Update the employee record
        const result = await query(
          `UPDATE employee 
           SET email = $1, phone_number = $2, role = $3
           WHERE id = $4 RETURNING *`,
          [email, phone_number, role, id]
        );
        if (result.rowCount > 0) {
          res.status(200).json({ message: 'Employee updated successfully', employee: result.rows[0] });
        } else {
          res.status(404).json({ error: 'Employee not found' });
        }
      } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }
  else if(req.body.option === 4)  //Get specific employee
  {
    const { id } = req.body;
    try {
      // Query the database for the employee with the given ID
      const result = await query('SELECT id, name, role FROM employee WHERE id = $1', [id]);
      if (result.rows.length > 0) {
        res.status(200).json({employee: result.rows[0]});
      } else {
        res.status(404).json({ error: 'Employee not found' });
      }
    } catch (error) {
      console.error('Error fetching employee:', error);
      res.status(500).json({ error: 'Internal Server}) Error' });
    }
  }
}
