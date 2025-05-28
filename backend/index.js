
const express = require('express');
//const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/students', studentRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));