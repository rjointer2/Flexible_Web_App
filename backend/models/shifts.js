
const mongoose = require('mongoose');

// Define a schema constructor from mongoose 

const Schema = mongoose.Schema;

const shiftSchema = new Schema({
    
    day: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    employee: {
        type: String,
        require: true
    },
    attendance: {
        type: String,
        require: true
    },
    department: {
        type: String,
        require: true
    }, 


});

module.exports = mongoose.model('Shift', shiftSchema);