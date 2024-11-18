import { Pool } from 'pg';

// Set up the pool connection
const pool = new Pool({
  user: 'postgres',     // PostgreSQL username
  host: 'localhost',        // PostgreSQL server
  database: 'postgres', // Database name
  password: 'root', // Password
  port: 5432,               // Default PostgreSQL port
});

// Helper to run queries
export const query = (text, params) => pool.query(text, params);
