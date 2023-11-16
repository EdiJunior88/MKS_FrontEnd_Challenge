import Image from "next/image";
import { TiShoppingCart } from "react-icons/ti";
import { InterfaceCardHeader } from "@/app/interface/interface";
import {
  Container,
  ContainerShoppingCart,
  ShoppingCartOpen,
  ContainerShoppingCartHeader,
  ShoppingCartName,
  ScrollableContainer,
  ContainerButton,
  ButtonClose,
  Button,
  ContainerCardItens,
  ButtonCloseProduct,
  CardItens,
  ContainerButtonQuantity,
  NameProduct,
  Quantity,
  ButtonQuantity,
  ButtonQuantityRight,
  ButtonQuantityLeft,
  ItemQuantity,
  Price,
  ContainerTotalPurchase,
  TotalPurchase,
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
      <ContainerShoppingCart onClick={toggleCart}>
        {/* Ícone de carrinho */}
        <TiShoppingCart size={20} />

        {/* Número de itens no carrinho */}
        <div>{cartItems.reduce((total, item) => total + item.quantity, 0)}</div>
      </ContainerShoppingCart>

      {/* Janela do carrinho */}
      {isCartOpen && (
        <ShoppingCartOpen>
          <>
            <ContainerShoppingCartHeader>
              <ShoppingCartName>
                Carrinho
                <br /> de Compras
              </ShoppingCartName>
              <ButtonClose onClick={toggleCart}>X</ButtonClose>
            </ContainerShoppingCartHeader>

    
            <ScrollableContainer>
            {/* Os itens do carrinho são renderizados aqui */}
            <ContainerButton>
              {cartItems.map((item, index) => (
                <ContainerCardItens key={index}>
                  <ButtonCloseProduct onClick={() => removeFromCart(index)}>
                    x
                  </ButtonCloseProduct>
                  <CardItens>
                    <Image
                      src={item.photo}
                      width={0}
                      height={0}
                      sizes='100vw'
                      style={{ width: "auto", height: "57px" }}
                      alt='Products'
                      priority={true}
                    />
                    <NameProduct>{item.name}</NameProduct>
                    <ContainerButtonQuantity>
                      <Quantity>Qtd</Quantity>
                      <ButtonQuantity>
                        <ButtonQuantityRight
                          onClick={() =>
                            updateQuantity(
                              index,
                              Math.max(item.quantity - 1, 1)
                            )
                          }>
                          -
                        </ButtonQuantityRight>
                        <ItemQuantity>{item.quantity}</ItemQuantity>
                        <ButtonQuantityLeft
                          onClick={() =>
                            updateQuantity(index, item.quantity + 1)
                          }>
                          +
                        </ButtonQuantityLeft>
                      </ButtonQuantity>
                    </ContainerButtonQuantity>
                    <Price>R${item.price}</Price>
                  </CardItens>
                </ContainerCardItens>
              ))}
            </ContainerButton>
            </ScrollableContainer>

            <ContainerTotalPurchase>
              <TotalPurchase>Total:</TotalPurchase>
              <TotalPurchase>
                {/* Formata o valor para a moeda brasileira (Real) */}
                {calculateTotal().toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TotalPurchase>
            </ContainerTotalPurchase>
            <Button onClick={clearCart}>Finalizar Compra</Button>
          </>
        </ShoppingCartOpen>
      )}
    </Container>
  );
}
