import React, { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Button, Card, Grid, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';

function SinglePost(props) {

//     const postId = props.match.params.postId;
//     const { user } = useContext(AuthContext);

//     const { data: { getpost } } = useQuery(FETCH_POST_QUERY, {
//         variables: {
//             postId
//         }
//     })


//     let postMarkup;
//     if (!getpost) {
//         postMarkup = <p>Loading Post....</p>
//     }
//     else {
//         const { id, body, createdAt, userName, comments, likes, commentCount, likeCount } = getpost
//     }

//     postMarkup = (
//         <Grid>
//             <Grid.Row>
//                 <Grid.Column width={2}>
//                     <Image
//                         floated='right'
//                         size='small'
//                         src='https://react.semantic-ui.com/images/avatar/large/molly.png'
//                     />
//                 </Grid.Column>
//                 <Grid.Column width={10}>
//                     <Card fluid>
//                         <Card.Content>
//                             <Card.Header>{userName}</Card.Header>
//                             <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
//                             <Card.Description>{body}</Card.Description>
//                         </Card.Content>
//                         <hr />
//                         <Card.Content extra>
//                             <LikeButton user={user} post={{ id, likeCount, likes }} />
//                             <Button
//                                 as="div"
//                                 labelPosition="right"
//                                 onClick={() => console.log('comment')}
//                             >
//                                 <Button basic color="blue">
//                                     <Icon name="comments" />
//                                 </Button>
//                                 <Label basic color="blue" pointing="left">
//                                     {commentCount}
//                                 </Label>
//                             </Button>
//                         </Card.Content>
//                     </Card>
//                 </Grid.Column>
//             </Grid.Row>
//         </Grid>
//     )
// }

// const FETCH_POST_QUERY = gql`
//  query($postId : ID!) {
//      getpost(postId: $postId) {
//        id body createdAt userName likeCount
//        likes {
//            userName
//        }
//        commentCount
//        comments {
//            id userName createdAt body
//        }
//      }
//  }
// `
}

export default SinglePost
