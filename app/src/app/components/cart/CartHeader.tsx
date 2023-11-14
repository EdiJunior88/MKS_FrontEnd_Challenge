import { FaShoppingCart } from "react-icons/fa";

const CartHeader = ({
  cartItems,
  toggleCart,
  isCartOpen,
  removeFromCart,
  updateQuantity,
  clearCart,
}) => {
  return (
    <div style={{ position: "relative" }}>
      {/* Ícone de carrinho */}
      <FaShoppingCart
        size={30}
        style={{ cursor: "pointer" }}
        onClick={toggleCart}
      />

      {/* Número de itens no carrinho */}
      {cartItems.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            background: "red",
            borderRadius: "50%",
            padding: "4px 8px",
            color: "white",
          }}>
          {cartItems.reduce((total, item) => total + item.quantity, 0)}
        </div>
      )}

      {/* Janela do carrinho */}
      {isCartOpen && (
        <div
          style={{
            position: "absolute",
            top: "50px",
            right: "0",
            background: "#fff",
            border: "none",
            padding: "10px",
            zIndex: 999,
          }}>
          {/* Os itens do carrinho são renderizados aqui */}
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - R${item.price} - Quantidade: {item.quantity}
                <button onClick={() => removeFromCart(index)}>Remover</button>
                <button
                  onClick={() => updateQuantity(index, item.quantity + 1)}>
                  +1
                </button>
                <button
                  onClick={() =>
                    updateQuantity(
                      index,
                      item.quantity > 1 ? item.quantity - 1 : 1
                    )
                  }>
                  -1
                </button>
              </li>
            ))}
          </ul>
          <button onClick={clearCart}>X</button>
        </div>
      )}
    </div>
  );
};

export default CartHeader;
