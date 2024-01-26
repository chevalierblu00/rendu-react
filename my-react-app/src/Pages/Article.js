import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  useGetArticlesQuery,
  useGetCommentsQuery,
  useCreateCommentMutation,
} from '../Services/API';
import { useCart } from '../Providers/CartContext';
import styled from 'styled-components';

const Container = styled.div`
  font-family: 'Helvetica Neue', sans-serif;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Navbar = styled.div`
  background-color: #333;
  color: white;
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Brand = styled.h1`
  margin: 0;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-right: 20px;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

const ArticleContainer = styled.div`
  padding: 20px;
  width: 80%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ArticleHeader = styled.div`
  text-align: center;

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  img {
    max-width: 100%;
    height: auto;
    margin-bottom: 10px;
    border-radius: 4px;
  }

  p {
    margin-bottom: 5px;
  }
`;

const CommentInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
`;

const CommentButton = styled.button`
  padding: 8px;
  font-size: 14px;
  background-color: #333;
  color: white;
  cursor: pointer;
`;

const CommentSection = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const Comment = styled.div`
  background-color: #f4f4f4;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
`;

export default function Article() {
  const { id } = useParams();
  const { data: articles, isFetching, isError } = useGetArticlesQuery();
  const { data: comments, isFetching: commentsFetching, isError: commentsError } = useGetCommentsQuery(
    id
  );
  const [username, setUsername] = useState('');
  const [commentText, setCommentText] = useState('');

  const [createCommentMutation] = useCreateCommentMutation();
  const { cart } = useCart();

  const currentArticle = articles && articles.find((article) => article.id === id);

  const handleCreateComment = async () => {
    try {
      const response = await createCommentMutation({
        id: id,
        username: username,
        comment: commentText
      });
      console.log("Comment created successfully:", response);
      
      window.location.reload();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };
  

  return isFetching ? (
    <p>Fetching...</p>
  ) : (
    <Container>
      <Navbar>
        <Brand>{currentArticle.title}</Brand>
        <div>
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/panier">Panier: {cart.length}</NavLink>
        </div>
      </Navbar>
      <ArticleContainer>
        {currentArticle && (
          <ArticleHeader key={currentArticle.id}>
            <img src={currentArticle.image} alt={currentArticle.title} />
            <p>Price: {currentArticle.price}</p>
            <p>Quantity: {currentArticle.quantity}</p>
          </ArticleHeader>
        )}
        <CommentInput
          type="text"
          name="username"
          placeholder="Your Name"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <CommentInput
          type="text"
          name="comment"
          placeholder="Add a Comment"
          onChange={(e) => setCommentText(e.target.value)}
          value={commentText}
        />
        <CommentButton onClick={handleCreateComment}>Add Comment</CommentButton>
        <CommentSection>
          <h3>Comments</h3>
          {comments && comments.length > 0 ? (
            comments.map((data) => (
              <Comment key={data.id}>
                <p>Username: {data.username}</p>
                <p>Comment: {data.comment}</p>
              </Comment>
            ))
          ) : (
            <p>No comments available yet.</p>
          )}
        </CommentSection>
      </ArticleContainer>
    </Container>
  );
}