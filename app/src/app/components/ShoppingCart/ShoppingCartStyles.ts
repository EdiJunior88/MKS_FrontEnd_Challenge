// ShoppingCartStyles.ts

"use client";

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
`;

export const ContainerShoppingCart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 56px;
  height: 45px;
  padding: 0 18px;
  border-radius: 10px;
  cursor: pointer;
  background: #fff;
  z-index: 0;
`;

export const ShoppingCartOpen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  width: 486px;
  height: 100%;
  top: 0;
  right: 0;
  background: #0f52ba;
  border: none;
  box-shadow: -5px 0 5px 0 rgba(0, 0, 0, 0.11);
  z-index: 1;
`;

export const ContainerButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const Button = styled.button`
  width: 100%;
  height: 97px;
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  background: #000;
  border: none;
`;

export const ButtonX = styled.button`
  width: 38px;
  height: 38px;
  color: #fff;
  background: #000;
  border-radius: 50%;
  border: none;
`;
