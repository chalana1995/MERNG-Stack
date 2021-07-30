const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');



const User = require('../../models/User');

module.exports = {
    Mutation: {
        async register(_, { registerInput: { userName, password, confirmPassword, email } }, context, info) {
            // Validate user Data

            // Make  sure user doesnt already exists

            // hash password and create auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                userName,
                password,
                email,
                createdAt: new Date().toISOString()
            })

            const res = await newUser.save();

            const token = jwt.sign({
                id: res.id,
                email: res.email,
                userName: res.userName
            }, SECRET_KEY, { expiresIn: '1h' })

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}