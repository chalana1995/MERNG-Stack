import React, { useState, useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import {
    useMutation,
    gql
} from "@apollo/client";
import { useForm } from '../utill/hook';
import { AuthContext } from '../context/auth';

function Login(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallBack, {
        userName: '',
        password: ''
    })


    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
            console.log(result.data.login);
            context.login(result.data.login);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors)
        },
        variables: values
    })

    function loginUserCallBack() {
        loginUser()
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Log In</h1>
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
                    label="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Login
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


const LOGIN_USER = gql`
mutation login(
    $userName: String!
    $password: String!
) {
    login(userName: $userName password: $password)
    {
        id email userName createdAt token
    }
}
`

export default Login
