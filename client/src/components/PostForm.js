import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';

import { FETCH_POSTS_QUERY } from '../utill/graphql';
import { useForm } from '../utill/hook';

function PostForm() {

    const { onChange, onSubmit, values } = useForm(createPostCallBack, {
        body: ''
    })

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            let newData = [...data.getposts];
            newData = [result.data.createPost, ...newData];
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    ...data,
                    getposts: {
                        newData,
                    },
                },
            });
            values.body = ''
        }
    })

    function createPostCallBack() {
        createPost();
    }


    return (
        <Form onSubmit={onSubmit}>
            <h2>Create a Post</h2>
            <Form.Field>
                <Form.Input
                    placeholder="Hi World"
                    name="body"
                    onChange={onChange}
                    value={values.body}
                />
                <Button type="submit" color="teal">
                    Submit
                </Button>
            </Form.Field>
        </Form>
    )
}

const CREATE_POST_MUTATION = gql`
mutation createPost($body: String!){
    createPost(body: $body)
    {
        id body createdAt userName
        likes{
            id userName createdAt
        }
        likeCount
        comments {
            id body userName createdAt
        }
        commentCount
    }
}`

export default PostForm
