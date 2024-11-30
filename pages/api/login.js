import { query } from '../../lib/db'; // Adjust the import based on your db setup

export default async function handler(req, res) {
  if(req.method === 'POST') {
    const { username, password } = req.body;
    
    try {
      // Query the database for the employee with the given username
      const result = await query('SELECT id, username, password FROM employee WHERE username = $1', [username]);

      if (result.rows.length === 0) {
        // If no user is found with the given username
        return res.status(404).json({ error: 'User not found' });
      }

      const user = result.rows[0];

      // Check if the password matches
      if (user.password === password) {
        // If the passwords match, return success
        res.status(200).json({ message: 'Login successful', emp_id: user.id });
      } else {
        // If the passwords don't match
        res.status(401).json({ error: 'Invalid password' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing your request' });
    }
  }

}



















// import bcrypt from 'bcrypt';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { username, password } = req.body;

//     try {
//       // Fetch user from the database
//       const result = await query('SELECT * FROM users WHERE username = $1', [username]);
//       const user = result.rows[0];

//       if (!user) {
//         return res.status(401).json({ error: 'Invalid credentials' });
//       }

//       // Compare the hashed password
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(401).json({ error: 'Invalid credentials' });
//       }

//       // Successful login
//       // Here you can set a session or return a token
//       res.status(200).json({ message: 'Login successful', userId: user.id });
//     } catch (error) {
//       console.error('Login error:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// } 