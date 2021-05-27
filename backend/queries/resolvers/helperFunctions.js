
// Models

const Users = require('../../models/users');
const Shift = require('../../models/shifts');

// resolver helper functions

const getUserByID = async userID => {
    try {
        const user = Users.findById(userID);
        return {
            ...user,
            _id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            postingShifts: getShiftByID.bind(this, user.postingShifts),
        }

    } catch (err) {
        throw err
    }
}

const getShiftByID = async shiftID => {

    const shift = await Shift.find({  _id: { $in: shiftID }})

    try {
        shift.map( shiftItem => {
            return {
                ...shiftItem,
                _id: shiftItem.id,
                createdBy: getUserByID.bind(this, shiftItem.createdBy)
            }
        })
    } catch(err) {
        throw err
    }

}

module.exports = {

    getShiftByID,
    getUserByID

}