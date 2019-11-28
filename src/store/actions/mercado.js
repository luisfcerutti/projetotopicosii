import { ALTERA_LISTA_COMPRAS, 
    FINALIZANDO_COMPRA, 
    COMPRA_FINALIZADA,
    LOADING_MERCADO,
    MERCADO_LOADED,
    SET_MERCADO,
    SET_PRODUTOS_MERCADO
} from './actionTypes'
import firebase from 'react-native-firebase'

export const alteraListaCompras = (novaLista) => {
    return{
        type: ALTERA_LISTA_COMPRAS,
        payload: novaLista
    }
}

export const finalizandoCompra = () => {
    return {
        type: FINALIZANDO_COMPRA
    }
}

export const compraFinalizada = () => {
    return {
        type: COMPRA_FINALIZADA
    }
}

export const loadingMercado = () => {
    return {
        type: LOADING_MERCADO
    }
}

export const mercadoLoaded = () => {
    return {
        type: MERCADO_LOADED
    }
}

export const setMercado = (mercado) => {
    return {
        type: SET_MERCADO,
        payload: mercado
    }
}

export const setProdutosMercado = (produtos) => {
    return {
        type: SET_PRODUTOS_MERCADO,
        payload: produtos
    }
}

export const fetchProdutosMercado = (mercadoId) => {
    return dispatch => {
        dispatch(loadingMercado())
        let produtosMercado = {
            frutas: [],
            alimentos: [],
            produtosLimpeza: []
        }
        firebase.firestore().collection('mercados').doc(`${mercadoId}`).collection('categorias').get()
        .then((res) => {
            if(!res.empty){
                res.forEach((doc) => {
                    produtosMercado = {
                        ...produtosMercado,
                        [doc.id]: {
                            ...doc.data()
                        }
                    }
                })
                dispatch(setProdutosMercado(produtosMercado))
                dispatch(mercadoLoaded())
            }
        })
    }
}

export const fetchDadosMercado = (mercadoId) => {
    return dispatch => {
        dispatch(loadingMercado())
        firebase.firestore().collection('mercados').doc(`${mercadoId}`).get()
        .then((res) => {
            if(res.exists){
                let mercado = res.data()
                dispatch(setMercado(mercado))
                dispatch(mercadoLoaded())
                dispatch(fetchProdutosMercado(mercadoId))
            }
        })
        .catch((err) => {
            alert(err)
        })
    }
}

export const finalizaCompra = (userKey, listaCompras, valorCompra, nomeMercado) => {
    return dispatch => {
        dispatch(finalizandoCompra())
        let compraRealizada = {
            valor: valorCompra,
            data: new Date(),
            mercado: nomeMercado,
            produtos: listaCompras
        }
        firebase.firestore().collection('usuarios').doc(`${userKey}`).collection('comprasRealizadas').add(compraRealizada)
        .then(() => {
            dispatch(compraFinalizada())
        })
        .catch((err) => {

        })
    }
}