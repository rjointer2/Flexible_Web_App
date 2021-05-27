
// Models

const Users = require('../../models/users');
const Shift = require('../../models/shifts');

// resolver helper functions

const getUserByID = userID => {
    return Users.findById(userID).then(user => {
        // here we will return a object of the accessable properties 
        // the user object found
        return {
            ...user,
            _id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
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

    getShiftByID,
    getUserByID

}