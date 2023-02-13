import { useEffect, useState } from "react"
import styled from "styled-components"
import { iGetRestaurants } from "../../interfaces/Interfaces"
import CardOrdered from "../molecules/CardOrdered"
import { Pedidos } from "../template/TemplatePopeye"

const ModalArea = styled.section` 
    display: flex;
    position: fixed;
    justify-content: end;
    align-items: center;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    backdrop-filter: blur(1px);
    background-color: rgba(0,0,0,0.3);
    top: 0;
`

const Cart = styled.div`
    overflow-y: auto;
    float: right;
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 100%;
    width: 400px;
    background-color: white;
    

    @media only screen and (max-width: 460px) {
        width: 300px;
    }
`

const CloseModal = styled.div`
    cursor: pointer;
    height: min-content;
`
const SectionOrdered = styled.div`
    display: flex;
    flex-direction: column;
`

const Checkout = styled.button`
    border: none;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    border-radius: 20px;
    color: white;
    cursor: pointer;
    background-color: #10e710;
    height: 40px;
    transition: 0.3s;
    &:hover{
        background-color: #0faf0f;
    }
`

const ModalCart: React.FC<{ restaurant: iGetRestaurants, modalFunction: React.MouseEventHandler<HTMLDivElement>, pedidos: Array<Pedidos>, updateProductCart: Function, updateLocalProductCart: any, onModalConfirmation: any }> = (props) => {
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let totalCarrinho = 0
        props.pedidos.map((pedido: Pedidos) => {
            if (pedido.valor && pedido.qtd) {
                totalCarrinho = totalCarrinho + (pedido.valor * pedido.qtd)
            }
        })
        setTotal(totalCarrinho)
    }, [props.pedidos])


    return (
        <ModalArea>
            <Cart>
                <CloseModal onClick={props.modalFunction}>
                    <img height={30} src="https://cdn-icons-png.flaticon.com/512/2734/2734822.png" alt="close" />
                </CloseModal>
                <div>
                    Seu Pedido em:
                    <h3>{props.restaurant.nome}</h3>
                </div>
                <SectionOrdered>
                    {props.pedidos.map((pedido: Pedidos) => {
                        return <CardOrdered
                            key={pedido.id}
                            pedido={pedido}
                            productsCart={props.pedidos}
                            updateProductCart={props.updateProductCart}
                            updateLocalProductCart={props.updateLocalProductCart}
                        />
                    })}
                </SectionOrdered>
                <div>
                    {total > 0 ? <p>Total: R${total.toFixed(2)}</p> : null}
                </div>
                {total > 0 ?
                    <Checkout onClick={props.onModalConfirmation}>
                        Finalinar Compra
                    </Checkout>
                    : null
                }

            </Cart>

        </ModalArea>
    )
}
export default ModalCart
