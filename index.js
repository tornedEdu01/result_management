const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());



const dbConnect = require('./config/database');
dbConnect();


// Routes
const result = require("./routes/student");
app.use('/api/v1', result);
const subjectRoute = require("./routes/subjects");
app.use('/api/v2', subjectRoute);
const ResultRoute = require("./routes/result");
app.use('/api/v3',ResultRoute);


// Database Connection


// Port Configuration
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
