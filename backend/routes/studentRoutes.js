const express = require('express');
const router = express.Router();
const db = require('../db');

//create a new student
router.post('/', async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const [result] = await db.execute('insert into students(name,email,age) values(?,?,?)', [name, email, age]);
        res.status(201).json({ id: result.insertId, name, email, age });

    } catch (err) {
        res.status(500).json({ error: err.message });


    }
});

//get all students
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;


        const [countResult] = await db.execute('select count(*) as total from students');
        const total = countResult[0].total;
        const totalPages = Math.ceil(total / limit);




        const [students] = await db.execute(`SELECT * FROM students LIMIT ${limit} OFFSET ${offset}`);

        res.json({
            currentPage: page,
            perPage: limit,
            totalRecords: total,
            totalPages: totalPages,
            students: students

        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



//get a student by ID with marks
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [[student]] = await db.execute('select * from students where id =?', [id]);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        const [marks] = await db.execute('select subject, score from marks where student_id = ?', [id]);
        res.json({ ...student, marks });

    } catch (err) {
        res.status(500).json({ error: err.message });

    }
});

//update
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    try {
        await db.execute('update students set name= ?, email=?, age=? where id = ?', [name, email, age, id]);
        res.json({ message: 'Student updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//delete
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('delete from students where id = ?', [id]);
        res.json({ message: 'Student deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });

    }
});

//Enter marks
router.post('/marks', async (req, res) => {
    try {
        const { student_id, subject, score } = req.body;

        if (!student_id || !subject || score == null) {
            return res.status(400).json({ error: 'student-id, subject, and score are required.' });
        }

        // Check if student exists
        const [student] = await db.execute('SELECT * FROM students WHERE id = ?', [student_id]);
        if (student.length === 0) {
            return res.status(404).json({ error: 'Student not found.' });
        }

        // Insert mark
        const [result] = await db.execute(
            'INSERT INTO marks (student_id, subject, score) VALUES (?, ?, ?)',
            [student_id, subject, score]
        );

        res.status(201).json({
            message: 'Marks added successfully.',
            mark_id: result.insertId
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//get marks by ID 
router.get('/:id/marks', async (req, res) => {
    const { id } = req.params;
    try {

        const [marks] = await db.execute('select subject, score from marks where student_id = ?', [id]);
        res.json({ marks });

    } catch (err) {
        res.status(500).json({ error: err.message });

    }
});


module.exports = router;