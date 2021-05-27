
const {buildSchema} = require('graphql');

module.exports = buildSchema(`
    type Shift {
        _id: ID!
        time: String!
        day: String!
        createdBy: User!
        department: String!
        attendence: String!
        employee: String!
    }

    type User {
        _id: ID!
        firstname: String!
        lastname: String!
        username: String!
        password: String!
        postingShift: [Shift!]
        schedule: String!
        company: String!
        manager: String!
        department: String!
    }

    input ShiftInput {
        time: String!
        day: String!
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
`)