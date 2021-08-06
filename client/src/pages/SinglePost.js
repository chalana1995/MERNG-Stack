import React, { useContext, useRef, useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Button, Card, Grid, Icon, Label, Image, Comment, Form } from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

function SinglePost(props) {

    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
    console.log("===== postid ===", postId);

    const commentInputRef = useRef(null);

    const [comment, setComment] = useState('')

    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    });

    const [submitcomment] = useMutation(SUBMIT_COMMENT, {
        update() {
            setComment('')
            commentInputRef.current.blur()
        },
        variables: {
            postId,
            body: comment
        }
    })

    function deletePostCallback() {
        props.history.push('/')
    }

    let postMarkup;
    if (!data) {
        postMarkup = <p>Loading Post....</p>
    }
    else {
        const { id, body, createdAt, userName, comments, likes, commentCount, likeCount } = data.getpost

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            floated='right'
                            size='small'
                            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{userName}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likes, likeCount }} />
                                <Button
                                    as="div"
                                    labelPosition="right"
                                    onClick={() => console.log('comment')}
                                >
                                    <Button basic color="blue">
                                        <Icon name="comments" />
                                    </Button>
                                    <Label basic color="blue" pointing="left">
                                        {commentCount}
                                    </Label>
                                </Button>
                                {user && user.userName === userName && (
                                    <DeleteButton postId={id} callback={deletePostCallback} />
                                )}
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a comment</p>
                                    <Form>
                                        <div className="ui action input fluid">
                                            <input type="text" placeholder="Comment ..."
                                                name="comment"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                ref={commentInputRef} />
                                            <button className="ui button teal" disabled={comment.trim() === ''} onClick={submitcomment}>
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {
                            comments.map(comment => (
                                <Card fluid key={comment.id}>
                                    <Card.Content>
                                        {user && user.userName === comment.userName && (
                                            <DeleteButton postId={id} commentId={comment.id} />
                                        )}
                                        <Card.Header>{comment.userName}</Card.Header>
                                        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                        <Card.Description>{comment.body}</Card.Description>
                                    </Card.Content>
                                </Card>
                            ))
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    return postMarkup;
}

const FETCH_POST_QUERY = gql`
 query getpost($postId : ID!) {
     getpost(postId: $postId) {
       id body createdAt userName likeCount
       likes {
           userName
       }
       commentCount
       comments {
           id userName createdAt body
       }
     }
 }
`

const SUBMIT_COMMENT = gql`
 mutation createComment($postId: String! $body: String!){
    createComment(postId: $postId  body: $body) {
        id
        comments {
            id
            userName
            createdAt
            body
        }
        commentCount
    }
 }
`


export default SinglePost
