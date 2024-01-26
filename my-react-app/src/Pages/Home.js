import React from 'react';
import { useGetArticlesQuery, useCreateArticleMutation } from '../Services/API';
import { useCart } from '../Providers/CartContext';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  background-color: #333;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavbarBrand = styled.h1`
  margin: 0;
`;

const NavbarLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-right: 20px;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

const HomeContainer = styled.div`
  padding: 20px;
`;

const CartLink = styled(Link)`
  text-decoration: none;
  color: #333;
  margin-bottom: 20px;
  display: block;
`;

const ArticlesListContainer = styled.div`
  margin-top: 20px;
`;

const ArticlesListGrid = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const ArticleItem = styled.li`
  margin-bottom: 20px;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ArticleImage = styled.img`
  max-width: 100px;
`;

const AddToCartButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
`;

export default function Home() {
  const { cart, addToCart } = useCart();
  const { data, isFetching } = useGetArticlesQuery();
  const [createArticle] = useCreateArticleMutation();

  return (
    <div>
      <NavbarContainer>
        <NavbarBrand>produit</NavbarBrand>
        <div>
          <NavbarLink to="/">Accueil</NavbarLink>
          <NavbarLink to="/panier">Panier: {cart.length}</NavbarLink>
        </div>
      </NavbarContainer>
      <HomeContainer>
        {isFetching ? (
          <p>ça fetch</p>
        ) : (
          <div>
            <ArticlesList articles={data} addToCart={addToCart} />
          </div>
        )}
      </HomeContainer>
    </div>
  );
}

function ArticlesList({ articles, addToCart }) {
  return (
    <ArticlesListContainer>
      <h2>Produit</h2>
      <ArticlesListGrid>
        {articles.map((article) => (
          <ArticleItem key={article.id}>
            <ArticleImage src={article.image} alt={article.title} />
            <h3>
              <Link to={`/articles/${article.id}`}>{article.title}</Link>
            </h3>
            <AddToCartButton onClick={() => addToCart(article.title)}>
              Ajouter au panier
            </AddToCartButton>
          </ArticleItem>
        ))}
      </ArticlesListGrid>
    </ArticlesListContainer>
  );
}
