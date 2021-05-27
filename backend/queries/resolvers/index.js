
// Models

const Shifts = require('../../models/shifts');
const Users = require('../../models/users');

const getUserByID = userID => {
    return Users.findById(userID).then(user => {
        console.log(user)
        return {
            ...user,
            _id: user.id,
            postingShifts: getShiftByID.bind(this, user.postingShifts),
        }
    }).catch(err => {
        throw err
    }) 
}

const getShiftByID = shiftID => {
    return Shift.find({
        _id: { $in: shiftID }
    }).then(shiftItem => {
        return shiftItem.map(shift => {
            return {
                ...shift,
                _id: shift.id,
                createdBy: getshiftByID.bind(this, shift.createdBy)
            }
        })
    })
}

module.exports = {
    //resolver function
    shifts: () => {
        return Shifts.find()
        .then(resultingShift => {
            return resultingShift.map(shiftItem => {
                return { 
                    ...shiftItem._doc,
                    _id: shiftItem.id,
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
    },
    users: () => {
        return Users.find().then(result => {
            return result.map(res => {
                console.log( res)
                return { 
                    ...res._doc,
                    _id: res.id,
                    postingShifts: getShiftByID.bind(this, res.postingShifts)
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