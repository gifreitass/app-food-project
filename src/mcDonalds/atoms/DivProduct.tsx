import { DivAddProduct, DivImageProduct, DivProductStyle, DivTextProduct, ImageAddProduct, ImageProduct, PriceAndStock } from "../styled.components"
import { iGetProducts } from "../templates/TemplateProducts"

const DivProducts: React.FC<iGetProducts> = (props) => {
    return (
        <DivProductStyle>
            <DivTextProduct>
                <h2>{props.nome}</h2>
                <p>{props.descricao}</p>
                <PriceAndStock>R${props.valor}</PriceAndStock>
            </DivTextProduct>
            <DivImageProduct>
                <DivAddProduct>
                    <ImageAddProduct src="https://cdn-icons-png.flaticon.com/512/992/992651.png" alt="soma" />
                    <PriceAndStock>50</PriceAndStock>
                </DivAddProduct>
                <ImageProduct src={props.url} alt={props.descricao} />
            </DivImageProduct>
        </DivProductStyle>
    )
}

export default DivProducts