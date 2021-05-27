
const Users = require('../../models/users');

const getShiftByID = require('./helperFunctions').getShiftByID;

module.exports = {
    //resolver function
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