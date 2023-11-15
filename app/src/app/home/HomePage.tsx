"use client";

import Image from "next/image";
import { useQuery } from "react-query";
import apiProducts from "@/app/api/apiProducts";
import { useState } from "react";
import ShoppingCart from "@/app/components/ShoppingCart/ShoppingCart";
import { InterfaceApi } from "@/app/interface/interface";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Container,
  ContainerHeader,
  TitleHeader,
  SubStyle,
} from "@/app/home/HomePageStyles";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export default function HomePage() {
  const [cartItems, setCartItems] = useState<InterfaceApi[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Função para adicionar itens ao carrinho
  const addToCart = (item: InterfaceApi) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      const newCartItems = [...cartItems];
      newCartItems[existingItemIndex].quantity += 1;
      setCartItems(newCartItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // Função para remover um item do carrinho
  const removeFromCart = (index: number) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  // Função para atualizar a quantidade de um item
  const updateQuantity = (index: number, newQuantity: number) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = newQuantity;
    setCartItems(newCartItems);
  };

  // Função para limpar todo o carrinho
  const clearCart = () => {
    setCartItems([]);
    // Feche a janela do carrinho após limpar
    setIsCartOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Use a função useQuery para buscar os produtos
  const {
    data: products,
    error,
    isLoading,
  } = useQuery("productsData", apiProducts);

  // Verifique se ocorreu algum erro
  if (error) return <div>Aconteceu um erro, tente novamente mais tarde!</div>;

  return (
    <Container>
      <ContainerHeader className={montserrat.className}>
        <TitleHeader>
          MKS
          <SubStyle>Sistemas</SubStyle>
        </TitleHeader>

        {/* Componente carrinho de compras */}
        <ShoppingCart
          cartItems={cartItems}
          toggleCart={toggleCart}
          isCartOpen={isCartOpen}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          clearCart={clearCart}
        />
      </ContainerHeader>

      <ul>
        {isLoading
          ? // Renderizar o esqueleto enquanto os dados estão sendo carregados
            Array.from({ length: 8 }).map((_, index) => (
              <li key={index}>
                <Skeleton height={50} width={50} />
                <Skeleton height={20} width={200} />
                <Skeleton height={20} width={150} />
                <Skeleton height={20} width={100} />
                <Skeleton height={20} width={100} />
                <Skeleton height={50} width={50} />
                <Skeleton height={30} width={100} />
              </li>
            ))
          : // Renderize a lista de produtos
            products.map((product: InterfaceApi) => (
              <li key={product.id}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Preço: R${product.price}</p>
                <Image
                  src={product.photo}
                  width={50}
                  height={50}
                  alt='Picture of the author'
                  priority={true}
                />
                <button onClick={() => addToCart(product)}>Comprar</button>
              </li>
            ))}
      </ul>
    </Container>
  );
}
