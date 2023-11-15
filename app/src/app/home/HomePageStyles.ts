"use client";

import styled from "styled-components";

export const Container = styled.div`
position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const ContainerHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  background: #0f52ba;
  padding: 0 65px;
  height: 101px;
`;

export const TitleHeader = styled.span`
  font-size: 40px;
  font-weight: 600;
  color: #fff;
`;

export const SubStyle = styled.span`
  font-size: 20px;
  font-weight: 100;
  padding-left: 10px;
`;

export const ContainerShoppingCart = styled.div`
  display: flex;
`;
