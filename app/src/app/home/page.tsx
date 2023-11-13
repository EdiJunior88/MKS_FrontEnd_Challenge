"use client";

// Importe os módulos necessários
import Image from "next/image";
import { useQuery } from "react-query";
import apiProducts from "@/app/api/api";

export default function HomePage() {
  // Use a função useQuery para buscar os produtos
  const {
    data: products,
    error,
    isLoading,
  } = useQuery("productsData", apiProducts);

  // Verifique se está carregando os dados
  if (isLoading) return <div>Fetching products...</div>;

  // Verifique se ocorreu algum erro
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <ul>
        {products.map((product) => (
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
          </li>
        ))}
      </ul>
    </div>
  );
}
