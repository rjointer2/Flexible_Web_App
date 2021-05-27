
const Shifts = require('../../models/shifts');

const getUserByID = require('./helperFunctions').getUserByID

module.exports = {
    shifts: () => {
        return Shifts.find()
        .then(resultingShift => {
            return resultingShift.map(shiftItem => {
                return { 
                    ...shiftItem._doc,
                    _id: shiftItem.id,
                    username: shiftItem.username,
                    lastname: shiftItem.lastname,
                    createdBy: getUserByID.bind(this, shiftItem._doc.createdBy)
                }
            })
        }).catch(err => {
            throw err
        })
    },
    createShift: args => {
        const shift = new Shifts({
            time: args.shiftInput.time,
            day: args.shiftInput.day,
            createdBy: "60aecf22073a0b2a1c277068",
            attendence: args.shiftInput.attendence,
            employee: args.shiftInput.employee,
            department: args.shiftInput.department,
        });
        return shift.save().then(result => {
            console.log(result)
            return result
        }).catch((err) => {
            throw err
        })
    }
}