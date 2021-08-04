import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import {
    useMutation,
    gql
} from "@apollo/client";
import { useForm } from '../utill/hook';
import { AuthContext } from '../context/auth';

function Register(props) {
    const [errors, setErrors] = useState({});
    const context = useContext(AuthContext);
    const { onChange, onSubmit, values } = useForm(registerUser, {
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [addUser, { loading }] = useMutation(USER_REGISTER, {
        update(_, { data: { register: userData } }) {
            context.login(userData);
            props.history.push('/login');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors)
        },
        variables: values
    })

    function registerUser() {
        addUser();
    }




    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="User Name..."
                    name="userName"
                    type="text"
                    error={errors.userName ? true : false}
                    value={values.userName}
                    onChange={onChange}
                />
                <Form.Input
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    type="email"
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Confirme Password"
                    placeholder="Confirme Password"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {errors && Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}


const USER_REGISTER = gql`
mutation register(
    $userName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
) {
    register(
        registerInput: {
            userName: $userName
            email: $email
            password: $password
            confirmPassword:  $confirmPassword
        }
    )
    {
        id email userName createdAt token
    }
}
`

export default Register
