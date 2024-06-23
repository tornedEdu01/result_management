const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    studentName: {
        type: String,  // Assuming student name is a string
        required: true,
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    },
    subjectName: {
        type: String,  // Assuming subject name is a string
        required: true,
    },
    maxMarks: {
        type: Number,
        required: true,
    },
    marks: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Result', resultSchema);
