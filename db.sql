-- Create the employee table with email
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,       -- Auto-incrementing unique ID for each employee
    name VARCHAR(100) NOT NULL,  -- Employee name
    role VARCHAR(50) NOT NULL,   -- Employee role
    email VARCHAR(150) UNIQUE NOT NULL -- Employee email, must be unique
);

-- Create the project table
CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,        -- Auto-incrementing unique ID for each project
    project_name VARCHAR(150) NOT NULL,   -- Name of the project
    employee_id INT,                      -- Foreign key referencing the employee table
    CONSTRAINT fk_employee FOREIGN KEY (employee_id) REFERENCES employee (id)
);

-- drop table project;

-- drop table employee;