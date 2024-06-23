const mongoose = require("mongoose");
const result = require("./result");

const studentSchema = new mongoose.Schema({
    rollNumber :{
            type : String,
            required : true,
            unique : true,
    },
    name : {
        type : String,
        required : true,
    }, 
    
});

module.exports = mongoose.model('Student',studentSchema);