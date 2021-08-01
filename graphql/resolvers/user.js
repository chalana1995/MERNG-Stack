const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config');
const { UserInputError } = require('apollo-server');

const { validateRegisterinput, validLoginInput } = require('../../util/validators');
const User = require('../../models/User');

function generateToke(user) {
   return jwt.sign({
        id: user.id,
        email: user.email,
        userName: user.userName
    }, SECRET_KEY, { expiresIn: '1h' })
}

module.exports = {
    Mutation: {
        async login(_, { userName, password }) {
            const { errors, valid } = validLoginInput(userName, password);
            const user = await User.findOne({ userName });

            if(!valid) {
                throw new UserInputError('Errors', { errors })
            }

            if (!user) {
                errors.general = 'User Not Found';
                throw new UserInputError('User Not Found', { errors })
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', { errors })
            }

            const token = generateToke(user);

            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        async register(_, { registerInput: { userName, password, confirmPassword, email } }) {


            // Validate user Data
            const { valid, errors } = validateRegisterinput(userName, password, confirmPassword, email);

            if (!valid) {
                throw new UserInputError('Error', { errors });
            }

            // Make  sure user doesnt already exists
            const user = await User.findOne({ userName });

            if (user) {
                throw new UserInputError('Username All Ready Taken', {
                    errors: {
                        userName: 'This username is taken'
                    }
                })
            }

            // hash password and create auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                userName,
                password,
                email,
                createdAt: new Date().toISOString()
            })

            const res = await newUser.save();

            const token = generateToke(res);

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}