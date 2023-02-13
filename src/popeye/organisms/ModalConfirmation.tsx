import { Link } from "react-router-dom"
import styled from "styled-components"
import { iGetRestaurants } from "../../interfaces/Interfaces"
import { Pedidos } from "../template/TemplatePopeye"

const ModalArea = styled.section` 
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    backdrop-filter: blur(1px);
    background-color: rgba(0,0,0,0.3);
    top: 0;
`
const Form = styled.div`
    background-color: white;
    border-radius: 20px;
    padding: 20px;
    position: fixed;
    align-items: center;
    width: 400px;
    @media only screen and (max-width: 460px) {
        width: 300px;
    }
`
const InputField = styled.div`
    display: flex;
    flex-direction: column;
`

const ButtonConfirm = styled.button`
    width: 100%;
`
const CloseModal = styled.button`
    background-color: white;
    border: none;
    cursor: pointer;
    height: min-content;
`
const ModalConfirmation: React.FC<{ modalFnc: any, pedidos: any, restaurant: iGetRestaurants, updateProductCart: Function, updateLocalProductCart: any }> = (props) => {

    function addPedidos() {
        //@ts-ignore
        const pedido = JSON.parse(localStorage.getItem(props.restaurant.id + "_restaurant"))
        //@ts-ignore
        let pedidos = JSON.parse(localStorage.getItem("pedidos")) || []
        pedidos.push(pedido)
        localStorage.setItem("pedidos", JSON.stringify(pedidos))
        props.updateLocalProductCart.delete(props.restaurant.id + "_restaurant")
        props.updateProductCart([])
        props.modalFnc()
        alert("Usúario Verificado, Bon Appetit")
    }

    return (
        <ModalArea>
            <Form>
                <CloseModal onClick={props.modalFnc} >
                    <img height={30} src="https://cdn-icons-png.flaticon.com/512/2734/2734822.png" alt="close" />
                </CloseModal>
                <h1>Confirme seu Usuário</h1>
                <InputField>
                    <label htmlFor="name">Nome</label>
                    <input type="text" name="name" />
                </InputField>
                <InputField>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" />
                </InputField>
                <InputField>
                    <label htmlFor="password">Senha:</label>
                    <input type="password" name="password" />
                </InputField>
                <InputField>
                    <label htmlFor="cpf">CPF:</label>
                    <input type="text" name="cpf" />
                </InputField>

                <ButtonConfirm onClick={addPedidos}>Verificar</ButtonConfirm>
            </Form>
        </ModalArea>
    )
}
export default ModalConfirmation