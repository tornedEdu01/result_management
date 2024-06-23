const express = require("express");
const router = express.Router();

const Result = require("../models/result");
const Student = require("../models/student");
const Subject = require("../models/subject");

router.post("/create/marks", async (req, res) => {
    try {
        const { studentId, subjectId, marks, maxMarks } = req.body;

        // Fetch student and subject details from their collections
        const student = await Student.findById(studentId);
        const subject = await Subject.findById(subjectId);

        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        if (!subject) {
            return res.status(404).json({ success: false, message: 'Subject not found' });
        }

        // Create a new result document with student and subject details
        const newResult = new Result({
            studentId,
            studentName: student.name, // Include student name
            subjectId,
            subjectName: subject.name, // Include subject name
            maxMarks,
            marks
        });

        // Save the new result document to MongoDB
        await newResult.save();

        // Respond with success message and created result data
        res.status(201).json({
            success: true,
            data: newResult,
            message: "Result uploaded successfully",
        });
    } catch (err) {
        // Handle any errors that occur during creation or saving of the result
        res.status(400).json({
            success: false,
            error: err.message,
            message: "Failed to upload result",
        });
    }
});

router.get('/get/marks/:rollNumber', async (req, res) => {
    try {
        const student = await Student.findOne({ rollNumber: req.params.rollNumber });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found!",
            });
        }

        // Find results for the student and populate subjectId with subjectName
        const results = await Result.find({ studentId: student._id })
            .populate({
                path: 'subjectId',
                model: 'Subject', // Name of the model as registered with mongoose
                select: 'name' // Populate only the subject name
            });

        // Calculate total max marks
        const totalMaxMarks = results.reduce((total, result) => total + result.maxMarks, 0);
        // Calculate total marks
        const totalMarks = results.reduce((total, result) => total + result.marks, 0);
        // Calculate percentage
        const percentage = (totalMarks / totalMaxMarks) * 100;

        res.status(200).json({
            success: true,
            message: `Student with ${student.rollNumber} is successfully found`,
            student,
            results,
            totalMaxMarks,
            totalMarks,
            percentage
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: `Error: ${err.message}`
        });
    }
});

router.patch('/update/:id', async (req, res) => {
    const { marks, maxMarks } = req.body;

    try {
        let updatedFields = {};
        if (marks !== undefined) updatedFields.marks = marks;
        if (maxMarks !== undefined) updatedFields.maxMarks = maxMarks;

        const updatedResult = await Result.findByIdAndUpdate(req.params.id, updatedFields, { new: true })
            .populate({
                path: 'studentId',
                select: 'name' // Select only 'name' field from student document
            })
            .populate({
                path: 'subjectId',
                select: 'name' // Select only 'name' field from subject document
            });

        if (!updatedResult) {
            return res.status(404).json({ success: false, message: 'Result not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Result updated successfully',
            result: updatedResult
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update result',
            error: error.message
        });
    }
});



module.exports = router;
