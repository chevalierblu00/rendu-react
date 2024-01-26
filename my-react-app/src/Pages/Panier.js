import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Providers/CartContext';
import styled from 'styled-components';

const Navbar = styled.div`
  background-color: #333;
  color: white;
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  text-align: center;
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

const CartContainer = styled.div`
  margin: 0 auto;
  padding: 0px;
`;

const CartTitle = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const CartList = styled.ul`
  list-style: none;
  padding: 0;
  margin-left: 25rem;
  text-align: center;
  max-width: 600px;
`;

const CartItem = styled.li`
  font-size: 18px;
  color: #555;
  margin-bottom: 10px;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
`;

export function CartPage() {
  const { cart } = useCart();

  return (
    <CartContainer>
      <Navbar>
        <Brand>panier</Brand>
        <div>
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/panier">Panier: {cart.length}</NavLink>
        </div>
      </Navbar>
      <CartTitle>Liste des articles</CartTitle>
      <CartList>
        {cart.map((item, index) => (
          <CartItem key={index}>
            {item}
          </CartItem>
        ))}
      </CartList>
    </CartContainer>
  );
}
