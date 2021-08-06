import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Icon, Button, Confirm } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../utill/graphql';

function DeleteButton({ postId, callback }) {

    const [confirmOpen, setConfirmOpen] = useState(false);


    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(proxy) {
            setConfirmOpen(false);
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            let newData = data.getposts.filter(p => p.id !== postId)
            
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    ...data,
                    getposts: {
                        newData,
                    },
                },
            });
            if (callback) callback();
        },
        variables: {
            postId
        }
    })

    return (
        <>
            <Button as="div" color="red" floated="right" onClick={() => setConfirmOpen(true)}>
                <Icon name="trash" style={{ margin: 0 }} />
            </Button>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePost}
            />
        </>
    )
}

const DELETE_POST_MUTATION = gql`
mutation deletePost($postId : ID!){
    deletePost(postId: $postId )
}
`

export default DeleteButton
