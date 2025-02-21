import { gql } from '@apollo/client';

export const CREATE_LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      email
      
    }
  }
`;

export const CREATE_ADD_USER = gql`
  mutation addUser($username:String, $email: String!, $password: String!) {
    addUser(username: $username,email: $email, password: $password) {
      _id
      username
      email
      
     
    }
  }
`;
export const CREATE_SAVE_BOOK = gql`
  mutation saveBook($author:[String] , $description:String, $title:String, $bookId:ID!, $image:String, $link:String) {
    saveBook(author:$author , description:$description, title:$title, bookId:$bookId, image:$image, link:$link) {
        _id
        author
        description
        title
        bookId
        image
        link
    }
  }
`;

export const CREATE_REMOVE_BOOK = gql`
  mutation removeBook($bookId:ID) {
    removeBook(bookId:$bookId) {
      _id
      bookId
    }
  }
`;
