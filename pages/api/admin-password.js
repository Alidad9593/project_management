export default function handler(req, res) {
    if (req.method === 'POST') {
      const { password } = req.body;
  
      // Replace this with a secure password or hashed validation
      const correctPassword = 'admin123';
  
      if (password === correctPassword) {
        res.status(200).json({ valid: true });
      } else {
        res.status(403).json({ valid: false });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  