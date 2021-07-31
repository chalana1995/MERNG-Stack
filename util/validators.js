module.exports.validateRegisterinput = (userName, password, confirmPassword, email) => {
    const errors = {};

    if (userName.trim() === '') {
        errors.userName = 'Username must not be Empty'
    }

    if (email.trim() === '') {
        errors.email = 'Email must not be Empty'
    }
    else {
        const regX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.match(regX)) {
            errors.email = 'Email must be a valid Email Address'
        }
    }
    if (password === '') {
        errors.password = 'Password must not be Empty';

    } else {
        if (password !== confirmPassword) {
            errors.confirmPassword = 'Password must match'
        }
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validLoginInput = (userName, password) => {

    const errors = {};

    if (userName.trim() === '') {
        errors.userName = 'Username must not be Empty'
    }

    if (password.trim() === '') {
        errors.password = 'Password must not be Empty'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}