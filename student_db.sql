CREATE DATABASE IF NOT EXISTS studentdb;
USE studentdb;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT
);

CREATE TABLE marks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    subject VARCHAR(100),
    score INT,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

INSERT INTO students (name, email, age)
VALUES 
  ('Aarav Mehta', 'aarav.mehta@example.com', 20),
  ('Priya Sharma', 'priya.sharma@example.com', 22),
  ('Rohan Kumar', 'rohan.kumar@example.com', 21),
  ('Sneha Patel', 'sneha.patel@example.com', 23),
  ('Vikram Joshi', 'vikram.joshi@example.com', 20);


INSERT INTO marks (student_id, subject, score)
VALUES 
  (1, 'Math', 85),
  (1, 'Science', 78),
  (1, 'English', 92),

  (2, 'Math', 88),
  (2, 'Science', 90),
  (2, 'English', 87),

  (3, 'Math', 70),
  (3, 'Science', 65),
  (3, 'English', 72),

  (4, 'Math', 95),
  (4, 'Science', 91),
  (4, 'English', 93),

  (5, 'Math', 80),
  (5, 'Science', 76),
  (5, 'English', 82);



INSERT INTO students (name, email, age)
VALUES 
  ('Anjali Desai', 'anjali.desai@example.com', 21),
  ('Karan Verma', 'karan.verma@example.com', 22),
  ('Neha Singh', 'neha.singh@example.com', 20),
  ('Amitabh Roy', 'amitabh.roy@example.com', 23),
  ('Divya Iyer', 'divya.iyer@example.com', 21),
  ('Siddharth Pillai', 'siddharth.pillai@example.com', 22),
  ('Meera Nair', 'meera.nair@example.com', 19),
  ('Rahul Bansal', 'rahul.bansal@example.com', 21),
  ('Tanvi Kapoor', 'tanvi.kapoor@example.com', 20),
  ('Yash Malhotra', 'yash.malhotra@example.com', 23),
  ('Isha Reddy', 'isha.reddy@example.com', 22),
  ('Aditya Chauhan', 'aditya.chauhan@example.com', 21),
  ('Pooja Mishra', 'pooja.mishra@example.com', 22),
  ('Rajeev Saxena', 'rajeev.saxena@example.com', 24),
  ('Kriti Rao', 'kriti.rao@example.com', 20),
  ('Varun Sethi', 'varun.sethi@example.com', 21),
  ('Nikita Thakur', 'nikita.thakur@example.com', 23),
  ('Harsh Vora', 'harsh.vora@example.com', 22),
  ('Snehal Patil', 'snehal.patil@example.com', 20),
  ('Devansh Tripathi', 'devansh.tripathi@example.com', 21);
  
  
INSERT INTO marks (student_id, subject, score)
VALUES 
  (6, 'Math', 75), (6, 'Science', 78), (6, 'English', 82),
  (7, 'Math', 88), (7, 'Science', 85), (7, 'English', 90),
  (8, 'Math', 69), (8, 'Science', 72), (8, 'English', 74),
  (9, 'Math', 91), (9, 'Science', 89), (9, 'English', 94),
  (10, 'Math', 80), (10, 'Science', 82), (10, 'English', 79),
  (11, 'Math', 77), (11, 'Science', 75), (11, 'English', 81),
  (12, 'Math', 84), (12, 'Science', 88), (12, 'English', 86),
  (13, 'Math', 92), (13, 'Science', 90), (13, 'English', 93),
  (14, 'Math', 68), (14, 'Science', 65), (14, 'English', 70),
  (15, 'Math', 85), (15, 'Science', 87), (15, 'English', 84),
  (16, 'Math', 78), (16, 'Science', 80), (16, 'English', 76),
  (17, 'Math', 74), (17, 'Science', 70), (17, 'English', 73),
  (18, 'Math', 89), (18, 'Science', 91), (18, 'English', 88),
  (19, 'Math', 83), (19, 'Science', 85), (19, 'English', 87),
  (20, 'Math', 76), (20, 'Science', 78), (20, 'English', 80),
  (21, 'Math', 90), (21, 'Science', 92), (21, 'English', 91),
  (22, 'Math', 81), (22, 'Science', 79), (22, 'English', 83),
  (23, 'Math', 87), (23, 'Science', 89), (23, 'English', 86),
  (24, 'Math', 73), (24, 'Science', 70), (24, 'English', 75),
  (25, 'Math', 88), (25, 'Science', 84), (25, 'English', 90);

