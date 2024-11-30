-- Create the employee table with email
CREATE TABLE employee (
    id Serial PRIMARY KEY,       -- Auto-incrementing unique ID for each employee
    name VARCHAR(100) NOT NULL,  -- Employee name
    role VARCHAR(50) NOT NULL,   -- Employee role
    email VARCHAR(150) UNIQUE NOT NULL, -- Employee email, must be unique
	phone_number BIGINT,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(20) NOT NULL
);

drop table project;

drop table employee;

drop table project_assignment;

ALTER TABLE employee
ADD COLUMN start_date DATE NOT NULL DEFAULT CURRENT_DATE;
--TRUNCATE TABLE employee RESTART IDENTITY CASCADE;


-- Insert dummy data into the employee table
INSERT INTO employee (name, role, email, phone_number, username, password, start_date) VALUES
('Alice Johnson', 'Software Developer', 'alice.johnson@example.com', 1234567890, 'alice123', 'password123', '2022-01-15'),
('Bob Smith', 'Project Manager', 'bob.smith@example.com', 9876543210, 'bobsmith', 'securepass', '2021-03-10'),
('Charlie Brown', 'Quality Analyst', 'charlie.brown@example.com', 1122334455, 'charlieb', 'test1234', '2022-07-25'),
('Diana Prince', 'UI/UX Designer', 'diana.prince@example.com', 9988776655, 'dianap', 'designme', '2023-02-20'),
('Ethan Hunt', 'DevOps Engineer', 'ethan.hunt@example.com', 7766554433, 'ethanh', 'mission123', '2020-11-05');

Select* from employee


CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,          -- Auto-incrementing unique ID for each project
    project_name VARCHAR(150) NOT NULL,     -- Name of the project
    description TEXT,                       -- Description of the project
    due_date DATE,                          -- Project due date
    priority VARCHAR(10) NOT NULL CHECK (priority IN ('high', 'medium', 'low')), -- Priority: high, medium, or low
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp when the project is created
);

INSERT INTO project (project_name, description, due_date, priority) VALUES
('Website Redesign', 'Redesign the company website with new UI/UX.', '2024-12-31', 'high'),
('Mobile App Development', 'Develop a cross-platform mobile app.', '2025-03-15', 'medium'),
('Cloud Migration', 'Migrate the on-premise system to cloud infrastructure.', '2024-10-01', 'high');

select * from project

CREATE TABLE project_assignment (
    assignment_id SERIAL PRIMARY KEY,       -- Auto-incrementing unique ID for each assignment
    project_id INT NOT NULL,                -- Foreign key referencing the project table
    employee_id INT NOT NULL,               -- Foreign key referencing the employee table
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the assignment was made
    CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES project (project_id) ON DELETE CASCADE,
    CONSTRAINT fk_employee FOREIGN KEY (employee_id) REFERENCES employee (id) ON DELETE CASCADE
);

select * from project_assignment 
--DELETE FROM project_assignment WHERE project_id = 4

CREATE TABLE kanban_board (
    kanban_id SERIAL PRIMARY KEY,                -- Auto-incrementing unique ID for each Kanban entry
    project_id INT NOT NULL,                     -- Foreign key referencing the project table
    employee_id INT NOT NULL,                    -- Foreign key referencing the employee table
    status VARCHAR(20) NOT NULL CHECK (status IN ('To Do', 'In Progress', 'Done')), -- Task status
    CONSTRAINT fk_kanban_project FOREIGN KEY (project_id) REFERENCES project (project_id) ON DELETE CASCADE,
    CONSTRAINT fk_kanban_employee FOREIGN KEY (employee_id) REFERENCES employee (id) ON DELETE CASCADE
);

-- Insert dummy data into the kanban_board table
INSERT INTO kanban_board (project_id, employee_id, status) VALUES
(1, 1, 'To Do'),  -- Alice assigned to Website Redesign (project_id = 1) with 'To Do' status
(4, 2, 'In Progress'),  -- Bob assigned to Website Redesign with 'In Progress' status
(4, 3, 'Done'),  -- Charlie assigned to Mobile App Development (project_id = 2) with 'Done' status
(3, 1, 'To Do'),  -- Diana assigned to Cloud Migration (project_id = 3) with 'To Do' status
(1, 5, 'In Progress');  -- Ethan assigned to Mobile App Development with 'In Progress' status


Select* from kanban_board;
drop table kanban_board;