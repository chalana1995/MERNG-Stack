import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { Card, Icon, Label, Image, Button, Popup } from 'semantic-ui-react';

function LikeButton({ user, post: { id, likes, likeCount } }) {

    const [liked, setLiked] = useState(false)

    useEffect(() => {
        if (user && likes.find(like => like.userName === user.userName)) {
            setLiked(true);
        }
        else {
            setLiked(false)
        }
    }, [user, likes])



    const likeButton = user ? (
        liked ? (
            <Button color='teal'>
                <Icon name='heart' />
            </Button>
        ) : (
            <Button color='teal' basic>
                <Icon name='heart' />
            </Button>
        )
    ) : (
        <Button as={Link} to="/login" color='teal' basic>
            <Icon name='heart' />
        </Button>
    )

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id }
    })


    return (
        <>
            <Popup
                content="Like Post"
                inverted
                trigger={
                    <Button as='div' labelPosition='right' onClick={likePost}>
                        {likeButton}
                        <Label basic color='teal' pointing='left'>
                            {likeCount}
                        </Label>
                    </Button>
                }
            />
        </>
    )
}

const LIKE_POST_MUTATION = gql`
mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
        id
        likes {
            id userName
        }
        likeCount
    }
}
`

export default LikeButton
