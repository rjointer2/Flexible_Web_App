
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    firstname: {
        type: String,
        require: true 
    },
    lastname: {
        type: String,
        require: true 
    },
    schedule: {
        type: String,
        require: false
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    postingShift:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Shift'
        }
    ],
    company: {
        type: String,
        require: false
    },
    manager: {
        type: String,
        require: false
    }
    
});

module.exports = mongoose.model('User', userSchema);