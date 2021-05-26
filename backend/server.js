
// Modules

const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');

// Models

const Shifts = require('./models/shifts');
const Users = require('./models/users')

// GraphQL

const {

    buildSchema

} = require('graphql');
const { events } = require('./models/shifts');


const app = express();
const PORT = process.env.PORT || 3000;


const getUserByID = userID => {
    return Users.findById(userID).then(user => {3
        return {
            ...user._doc, _id: user.id
        }
    }).catch(err => {
        throw err
    }) 
}


// Middleware

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`

        type Shift {
            time: String!
            day: String!
            author: User!
            department: String!
            attendence: String!
            employee: String!
        }

        type User {
            firstname: String!
            lastname: String!
            username: String!
            password: String!
            cart: [Shift!]
            schedule: String!
            company: String!
            manager: String!
        }

        input ShiftInput {
            time: String!
            day: String!
            author: String!
            department: String!
            attendence: String!
            employee: String!
        }

        input UserInput {
            firstname: String!
            lastname: String!
            username: String!
            password: String!
        }

        type RootQuery {
            shifts: [Shift!]!
            users: [User!]!

        }

        type RootMutation {
           createShift(shiftInput: ShiftInput): Shift
           createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        //resolver function
        shifts: () => {
            return Shifts.find().populate('author').then(result => {
                return result.map(res => {
                    console.log( res)
                    return { ...res._doc }
                })
            }).catch(err => {
                throw err
            })
        },
        createShift: args => {
            const shift = new Shifts({
                time: args.shiftInput.time,
                day: args.shiftInput.day,
                author: args.shiftInput.author,
                attendence: args.shiftInput.attendance,
                employee: args.shiftInput.employee,
                department: args.shiftInput.department
            });
            return shift.save().then(result => {
                return result
            }).catch((err) => {
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
        },
        users: () => {
            return Users.find().then(result => {
                return result.map(res => {
                    console.log( res)
                    return { ...res._doc }
                })
            }).catch(err => {
                throw err
            })
        } 
    },
    graphiql: true,
}))

// Routes

app.get('/', (req, res) => {
    res.json('Hello World')
});

// Listen for request 

mongoose.connect(`mongodb+srv://${process.env.UN}:${process.env.PW}@postshiftapp.lb6zv.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        app.listen(PORT, () => {
            console.log('Server is listening...')
        })
}).catch(err => {
    console.log('oh no')
});

console.log(process.env.DB)
