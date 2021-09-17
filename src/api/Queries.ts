import { gql } from "@apollo/client";

export const POSTS = gql`
  query Posts {
    posts {
      id
      title
      youtube_url
      description
      createdAt
      author {
        id
        username
        avatar_url
      }
      comments {
        id
        comment
        createdAt
        user {
          id
          username
          avatar_url
        }
      }
    }
  }
`;

export const POST = gql`
  query Post($id: String!) {
    post(id: $id) {
      id
      title
      youtube_url
      description
      createdAt
      author {
        id
        username
        avatar_url
      }
      comments {
        id
        comment
        createdAt
        user {
          id
          username
          avatar_url
        }
      }
    }
  }
`;

export const LOGINED_USER = gql`
query LoginedUser{
  loginedUser{
    id
    avatar_url
    username
  }
}
`