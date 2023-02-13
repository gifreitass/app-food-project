import { useEffect, useState } from "react";
import styled from "styled-components";
import { iGetProducts, iGetRestaurants } from "../../interfaces/Interfaces"
import { Pedidos } from "../template/TemplatePopeye";

const Card = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    background-color: white;
    transition: 0.3s;
    height: 100%;
    width: 100%;
    border-radius: 20px;
    gap: 10px;

    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
        height: 100%;
    }
      
    @media only screen and (max-width: 600px) {
       flex-direction: column;
    }
`;


const ButtonAddCart = styled.button`
    display: flex;
    align-items: center;
    font-size: 20px;
    gap: 4px;
    background-color: white;
    border: none;
    cursor: pointer;
`

const DivOperations = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

const CardProduct: React.FC<{
    product: iGetProducts,
    updateProductCart: Function,
    productsCart: Array<Pedidos>,
    updateLocalProductCart: any,
    restaurant: iGetRestaurants

}> = (props) => {
    const [countProduct, setCountProduct] = useState(0)

    useEffect(() => {
        const copyProductsCart = [...props.productsCart];
        const item: any = copyProductsCart.find((product) => product.id === props.product.id);

        if (item && item.qtd) {
            setCountProduct(item.qtd)
        } else {
            setCountProduct(0)
        }
    }, [props.productsCart])


    function addProducToCart() {
        const copyProductsCart = [...props.productsCart];
        const item = copyProductsCart.find((product) => product.id === props.product.id);
        if (!item) {
            copyProductsCart.push({
                id: props.product.id,
                qtd: 1,
                valor: !(props.product.promocao != "true") ? props.product.valorPromocional : props.product.valor,
                nome: props.product.nome,
                idRestaurante: props.product.idRestaurante,
                descricao: props.product.descricao,
                nomeRestaurant: props.restaurant.nome,
                urlRestaurant: props.restaurant.url
            });
        } else {
            if (item.qtd) {
                item.qtd = item.qtd + 1;
            }
        }
        props.updateProductCart(copyProductsCart);
        props.updateLocalProductCart.set(copyProductsCart)
    }

    function removeProductToCart() {
        const copyProductsCart = [...props.productsCart];

        const item = copyProductsCart.find((product) => product.id === props.product.id);
        if (item && item.qtd) {
            if (item && item.qtd > 1) {
                item.qtd = item.qtd - 1;
                props.updateProductCart(copyProductsCart);
                props.updateLocalProductCart.remove(copyProductsCart)

            } else {
                const arrayFiltered = copyProductsCart.filter(
                    (product) => product.id !== props.product.id
                );
                props.updateProductCart(arrayFiltered)
                props.updateLocalProductCart.remove(arrayFiltered)

            }
        }

    }

    const DivPrices = styled.div`
        &>:first-child {
             color: ${!(props.product.promocao != "true") ? "red" : "black"};
             text-decoration: ${!(props.product.promocao != "true") ? "line-through" : "none"};
             font-size:  ${!(props.product.promocao != "true") ? "15px" : "none"};
            }
    `;

    return (
        <Card id={props.product.idRestaurante + "_" + props.product.id}>

            <div>
                <div>
                    <h2>{props.product.nome}</h2>
                    <p>{props.product.descricao}</p>
                    <DivPrices>
                        <h3>R${props.product.valor}</h3>
                        {!(props.product.promocao != "true") ? <h3>R${props.product.valorPromocional}</h3> : null}
                    </DivPrices>
                </div>


            </div>
            <div>
                <img width={200} src={props.product.url} alt="" />
            </div>
            <DivOperations>
                <ButtonAddCart onClick={addProducToCart}>
                    <img height={30} src="https://cdn-icons-png.flaticon.com/512/992/992651.png" alt="" />
                </ButtonAddCart>
                {countProduct}
                <ButtonAddCart onClick={removeProductToCart}>
                    <img height={30} src="https://cdn-icons-png.flaticon.com/512/992/992683.png" alt="" />
                </ButtonAddCart>
            </DivOperations>

        </Card>
    )
}

export default CardProduct