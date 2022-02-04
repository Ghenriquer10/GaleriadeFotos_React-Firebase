import * as C from './styles';

// Tipando a propriedade que será recebida ao componente
type Props = {
    url: string
    name: string
}

// Componente resposável por cada imagem da galeria
export function PhotoItem({url, name} : Props){
    return(
        <C.Container>
            <img src={url} alt={name}/>
            {name}
        </C.Container>
    )
}