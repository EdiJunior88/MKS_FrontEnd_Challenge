import { FaShoppingCart } from "react-icons/fa";
import { InterfaceCardHeader } from "@/app/interface/interface";
import {
  Container,
  ContainerShoppingCart,
  ShoppingCartOpen,
  ContainerButton,
  ButtonX,
  Button,
} from "@/app/components/ShoppingCart/ShoppingCartStyles";

export default function ShoppingCart({
  cartItems,
  toggleCart,
  isCartOpen,
  removeFromCart,
  updateQuantity,
  clearCart,
}: InterfaceCardHeader) {
  // Função para calcular o total do carrinho
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <Container>
      <ContainerShoppingCart>
        {/* Ícone de carrinho */}
        <FaShoppingCart size={20} onClick={toggleCart} />

        {/* Número de itens no carrinho */}
        <div>{cartItems.reduce((total, item) => total + item.quantity, 0)}</div>
      </ContainerShoppingCart>

      {/* Janela do carrinho */}
      {isCartOpen && (
        <ShoppingCartOpen>
          {/* Os itens do carrinho são renderizados aqui */}
          <ul>
            <ContainerButton>
              <ButtonX onClick={clearCart}>X</ButtonX>
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
                      updateQuantity(index, Math.max(item.quantity - 1, 1))
                    }>
                    -1
                  </button>
                </li>
              ))}
            </ContainerButton>
          </ul>

          <div>
            <div>Total: R${calculateTotal().toFixed(2)}</div>
            <Button>Finalizar Compra</Button>
          </div>
        </ShoppingCartOpen>
      )}
    </Container>
  );
}
