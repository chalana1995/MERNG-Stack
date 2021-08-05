
import { gql } from '@apollo/client';

export const FETCH_POSTS_QUERY = gql`
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
}
`;