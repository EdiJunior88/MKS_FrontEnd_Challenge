// "use client";

// // Importe os módulos necessários
// import Image from "next/image";
// import { useQuery } from "react-query";
// import apiProducts from "@/app/api/api";
// import { useState } from "react";
// import { FaShoppingCart } from "react-icons/fa";

// export default function HomePage() {
//   const [cartItems, setCartItems] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   // Função para adicionar itens ao carrinho
//   const addToCart = (item) => {
//     const existingItemIndex = cartItems.findIndex(
//       (cartItem) => cartItem.id === item.id
//     );

//     if (existingItemIndex !== -1) {
//       const newCartItems = [...cartItems];
//       newCartItems[existingItemIndex].quantity += 1;
//       setCartItems(newCartItems);
//     } else {
//       setCartItems([...cartItems, { ...item, quantity: 1 }]);
//     }
//   };

//   // Função para remover um item do carrinho
//   const removeFromCart = (index) => {
//     const newCartItems = [...cartItems];
//     newCartItems.splice(index, 1);
//     setCartItems(newCartItems);
//   };

//   // Função para atualizar a quantidade de um item
//   const updateQuantity = (index, newQuantity) => {
//     const newCartItems = [...cartItems];
//     newCartItems[index].quantity = newQuantity;
//     setCartItems(newCartItems);
//   };

//   // Função para limpar todo o carrinho
//   const clearCart = () => {
//     setCartItems([]);
//     setIsCartOpen(false); // Feche a janela do carrinho após limpar
//   };

//   const toggleCart = () => {
//     setIsCartOpen(!isCartOpen);
//   };

//   // Use a função useQuery para buscar os produtos
//   const {
//     data: products,
//     error,
//     isLoading,
//   } = useQuery("productsData", apiProducts);

//   // Verifique se está carregando os dados
//   if (isLoading) return <div>Fetching products...</div>;

//   // Verifique se ocorreu algum erro
//   if (error) return <div>An error occurred: {error.message}</div>;

//   return (
//     <div>
//       <div style={{ position: "relative" }}>
//         {/* Ícone de carrinho */}
//         <FaShoppingCart
//           size={30}
//           style={{ cursor: "pointer" }}
//           onClick={toggleCart}
//         />

//         {/* Número de itens no carrinho */}
//         {cartItems.length > 0 && (
//           <div
//             style={{
//               position: "absolute",
//               top: "0",
//               right: "0",
//               background: "red",
//               borderRadius: "50%",
//               padding: "4px 8px",
//               color: "white",
//             }}>
//             {cartItems.reduce((total, item) => total + item.quantity, 0)}
//           </div>
//         )}

//         {/* Janela do carrinho */}
//         {isCartOpen && (
//           <div
//             style={{
//               position: "absolute",
//               top: "50px",
//               right: "0",
//               background: "#fff",
//               border: "none",
//               padding: "10px",
//               zIndex: 999,
//             }}>
//             {/* Os itens do carrinho são renderizados aqui */}
//             <ul>
//               {cartItems.map((item, index) => (
//                 <li key={index}>
//                   {item.name} - R${item.price} - Quantidade: {item.quantity}
//                   <button onClick={() => removeFromCart(index)}>Remover</button>
//                   <button
//                     onClick={() => updateQuantity(index, item.quantity + 1)}>
//                     +1
//                   </button>
//                   <button
//                     onClick={() =>
//                       updateQuantity(
//                         index,
//                         item.quantity > 1 ? item.quantity - 1 : 1
//                       )
//                     }>
//                     -1
//                   </button>
//                 </li>
//               ))}
//             </ul>
//             <button onClick={clearCart}>Limpar Carrinho</button>
//           </div>
//         )}
//       </div>

//       <ul>
//         {products.map((product) => (
//           <li key={product.id}>
//             <h2>{product.name}</h2>
//             <p>{product.description}</p>
//             <p>Preço: R${product.price}</p>
//             <Image
//               src={product.photo}
//               width={50}
//               height={50}
//               alt='Picture of the author'
//               priority={true}
//             />
//             <button onClick={() => addToCart(product)}>
//               Adicionar ao carrinho
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

"use client";

// Importe os módulos necessários
import Image from "next/image";
import { useQuery } from "react-query";
import apiProducts from "@/app/api/api";
import { useState } from "react";
import CartHeader from "../components/cart/CartHeader";

export default function HomePage() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Função para adicionar itens ao carrinho
  const addToCart = (item) => {
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
  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  // Função para atualizar a quantidade de um item
  const updateQuantity = (index, newQuantity) => {
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
  if (isLoading) return <div>Fetching products...</div>;

  // Verifique se ocorreu algum erro
  if (error) return <div>An error occurred: {error.message}</div>;

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
            <button onClick={() => addToCart(product)}>
              Adicionar ao carrinho
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
