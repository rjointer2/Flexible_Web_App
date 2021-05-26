
// Models

const Shifts = require('../../models/shifts');
const Users = require('../../models/users');

module.exports = {
    //resolver function
    shifts: () => {
        return Shifts.find().populate('createdBy').then(result => {
            return result.map(res => {
                console.log( res)
                return { ...res._doc,
                        _id: res.id,
                        createdBy: getUserByID.bind(this, res.createdBy)
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
            createdBy: args.shiftInput.createdBy,
            attendence: args.shiftInput.attendence,
            employee: args.shiftInput.employee,
            department: args.shiftInput.department,
        });
        return shift.save().then(result => {
            return result
        }).catch((err) => {
            throw err
        })
    },
    users: () => {
        return Users.find().then(result => {
            return result.map(res => {
                console.log( res)
                return { 
                    ...res._doc,
                    _id: res.id,
                    postingShifts: getShiftByID.bind(this, res._doc.postingShifts)
                }
            })
        }).catch(err => {
            throw err
        })
    },
    createUser: args => {
        const user = new Users({
            firstname: args.userInput.firstname,
            lastname: args.userInput.lastname,
            username: args.userInput.username,
            password: args.userInput.password,
        });
        return user.save().then(result => {
            return result
        }).catch((err) => {
            throw err
        })
    }
}