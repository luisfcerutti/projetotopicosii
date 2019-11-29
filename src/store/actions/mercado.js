import { ALTERA_LISTA_COMPRAS, 
    FINALIZANDO_COMPRA, 
    COMPRA_FINALIZADA,
    LOADING_MERCADO,
    MERCADO_LOADED,
    SET_MERCADO,
    SET_PRODUTOS_MERCADO,
    SET_TOTAL_COMPRA,
    LIMPA_LISTA
} from './actionTypes'
import firebase from 'react-native-firebase'
import { fetchEntregas } from './user'

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

export const setTotalCompra = (total) => {
    return {
        type: SET_TOTAL_COMPRA,
        payload: total
    }
}

export const limpaLista = () => {
    return {
        type: LIMPA_LISTA
    }
}

export const finalizaCompra = (userKey, listaCompras, valorCompra, nomeMercado, keyPgto) => {
    return dispatch => {
        dispatch(finalizandoCompra())
        let compraRealizada = {
            valor: valorCompra,
            data: new Date(),
            mercado: nomeMercado,
            produtos: listaCompras,
            status: false,
            keyFormaPagamento: keyPgto
        }
        firebase.firestore().collection('usuarios').doc(`${userKey}`).collection('entregas').add(compraRealizada)
        .then(() => {
            dispatch(fetchEntregas(userKey))
            dispatch(compraFinalizada())
        })
        .catch((err) => {

        })
    }
}