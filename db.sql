-- Create the employee table with email
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,       -- Auto-incrementing unique ID for each employee
    name VARCHAR(100) NOT NULL,  -- Employee name
    role VARCHAR(50) NOT NULL,   -- Employee role
    email VARCHAR(150) UNIQUE NOT NULL, -- Employee email, must be unique
	phone_number BIGINT,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(20) NOT NULL
);

-- Create the project table
CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,        -- Auto-incrementing unique ID for each project
    project_name VARCHAR(150) NOT NULL,   -- Name of the project
    employee_id INT,                      -- Foreign key referencing the employee table
    CONSTRAINT fk_employee FOREIGN KEY (employee_id) REFERENCES employee (id)
);
drop table project;

drop table employee;


-- Insert dummy data into the employee table
INSERT INTO employee (name, role, email, phone_number, username, password) VALUES
('Alice Johnson', 'Software Developer', 'alice.johnson@example.com', 1234567890, 'alice123', 'password123'),
('Bob Smith', 'Project Manager', 'bob.smith@example.com', 9876543210, 'bobsmith', 'securepass'),
('Charlie Brown', 'Quality Analyst', 'charlie.brown@example.com', 1122334455, 'charlieb', 'test1234'),
('Diana Prince', 'UI/UX Designer', 'diana.prince@example.com', 9988776655, 'dianap', 'designme'),
('Ethan Hunt', 'DevOps Engineer', 'ethan.hunt@example.com', 7766554433, 'ethanh', 'mission123');

Select* from employee
