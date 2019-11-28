import { ALTERA_LISTA_COMPRAS, 
    FINALIZANDO_COMPRA, 
    COMPRA_FINALIZADA,
    LOADING_MERCADO,
    MERCADO_LOADED,
    SET_MERCADO
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

export const fetchDadosMercado = (uf, cidade, mercadoId) => {
    return dispatch => {
        dispatch(loadingMercado())
        firebase.firestore().collection('estados').doc(`${uf}`).collection('cidades').doc(`${cidade}`)
        .collection('mercados').doc(`${mercadoId}`).get()
        .then((res) => {
            
        })
        .catch((err) => {

        })
    }
}