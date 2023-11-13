"use client";

// Importe os módulos necessários
import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Image from "next/image";

// Função para recuperar os produtos da nova API
const retrieveProducts = async () => {
  const response = await axios.get(
    "https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=5&sortBy=id&orderBy=DESC"
  );
  return response.data.products; // Obtenha a lista de produtos da resposta
};

// Componente para exibir os produtos
const DisplayProducts = () => {
  // Use a função useQuery para buscar os produtos
  const {
    data: products,
    error,
    isLoading,
  } = useQuery("productsData", retrieveProducts);

  // Verifique se está carregando os dados
  if (isLoading) return <div>Fetching products...</div>;

  // Verifique se ocorreu algum erro
  if (error) return <div>An error occurred: {error.message}</div>;

  // Renderize a lista de produtos
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <Image
            src={product.photo}
            width={500}
            height={500}
            alt='Picture of the author'
          />
        </li>
      ))}
    </ul>
  );
};

export default DisplayProducts;
