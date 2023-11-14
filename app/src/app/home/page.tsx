"use client";

// Importe os módulos necessários
import Image from "next/image";
import { useQuery } from "react-query";
import apiProducts from "@/app/api/api";
import { useState } from "react";
import CartHeader from "../components/cart/CartHeader";
import { InterfaceApi } from "../interface/interface";

export default function HomePage() {
  const [cartItems, setCartItems] = useState<InterfaceApi[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const message = "test";

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
    setIsCartOpen(false); // Feche a janela do carrinho após limpar
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

  // Verifique se está carregando os dados
  if (isLoading) return <div>Loading...</div>;

  // Verifique se ocorreu algum erro
  if (error) return <div>Aconteceu um erro, tente novamente mais tarde!</div>;

  return (
    <div>
      {/* Componente carrinho de compras */}
      <CartHeader
        cartItems={cartItems}
        toggleCart={toggleCart}
        isCartOpen={isCartOpen}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        clearCart={clearCart}
      />

      {/* Renderize a lista de produtos */}
      <ul>
        {products.map((product: InterfaceApi) => (
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
            <button onClick={() => addToCart(product)}>
              Adicionar ao carrinho
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
