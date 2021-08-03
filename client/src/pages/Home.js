import React from 'react';
import {
    useQuery,
    gql
} from "@apollo/client";
import { Grid, Image } from 'semantic-ui-react'
import PostCard from '../components/PostCard';

function Home() {

    const { loading, data: posts }  = useQuery(FETCH_POSTS_QUERY);

    return (
        <Grid columns={3}>
            <Grid.Row>
                <h1>Recents Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ?
                    (
                        <h1>Loading Posts ...</h1>
                    ) :
                    (
                        posts && posts.getposts.map((post) => (
                            <Grid.Column key={post.id} style={{marginBottom: 20}}>
                                <PostCard post={post} />
                            </Grid.Column>
                        ))
                    )}
            </Grid.Row>
        </Grid>
    )
}

const FETCH_POSTS_QUERY = gql`
 {
    getposts {
    id
    body
    createdAt
    userName
    comments {
      id
      userName
      body
    }
    likes {
      id
      userName
      createdAt
    }
    likeCount
    commentCount
  }
}`;

export default Home
