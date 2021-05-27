
// import resolvers

const userResolver = require('./userResolvers');
const shiftResolver = require('./shiftResolvers');

// merge into root resolver

const rootResolver = {
    ...userResolver,
    ...shiftResolver
}

module.exports = rootResolver