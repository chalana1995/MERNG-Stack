import React, { useContext } from 'react';
import {
    useQuery,
} from "@apollo/client";
import { Grid, Transition } from 'semantic-ui-react'
import PostCard from '../components/PostCard';
import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../utill/graphql';

function Home() {

    const { loading, data: posts } = useQuery(FETCH_POSTS_QUERY);
    const { user } = useContext(AuthContext);

    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recents Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
                {loading ?
                    (
                        <h1>Loading Posts ...</h1>
                    ) :
                    (
                        <Transition.Group>
                            {
                                posts && posts.getposts.map((post) => (
                                    <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                                        <PostCard post={post} />
                                    </Grid.Column>
                                ))
                            }
                        </Transition.Group>
                    )}
            </Grid.Row>
        </Grid>
    )
}



export default Home
