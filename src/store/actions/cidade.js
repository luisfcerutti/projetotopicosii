import { LOADING_CIDADE, CIDADE_LOADED, SET_MERCADOS_CIDADE, LOADING_CIDADES_UF, CIDADES_UF_LOADED, SET_CIDADES_UF } from './actionTypes'
import firebase from 'react-native-firebase'

export const loadingCidade = () => {
    return{
        type: LOADING_CIDADE
    }
}

export const cidadeLoaded = () => {
    return {
        type: CIDADE_LOADED
    }
}

export const setMercadosCidade = (listaMercados) => {
    return {
        type: SET_MERCADOS_CIDADE,
        payload: listaMercados
    }
}

export const fetchMercadosCidade = (uf, cidade) => {
    return dispatch => {
        dispatch(loadingCidade())
        let listaMercados = []
        firebase.firestore().collection('estados').doc(`${uf}`).collection('cidades').doc(`${cidade}`).get()
        .then((res) => {
            if(res.exists){
                listaMercados = Object.assign([], res.data().listaMercados)
            }
            dispatch(setMercadosCidade(listaMercados))
            dispatch(cidadeLoaded())
        })
        .catch((err) => {

        })
    }
}

export const loadingCidadesUf = () => {
    return {
        type: LOADING_CIDADES_UF
    }
}

export const cidadesUfLoaded = () => {
    return {
        type: CIDADES_UF_LOADED
    }
}

export const setCidadesUf = (cidadesList) => {
    return {
        type: SET_CIDADES_UF,
        payload: cidadesList
    }
}

export const fetchCidadesUf = (uf) => {
    return dispatch => {

        dispatch(loadingCidadesUf())
        
        let cidadesList = []

        firebase.firestore().collection('estados').doc(`${uf}`).collection('cidades').get()
        .then((res) => {

            if(!res.empty){
                res.forEach((doc) => {                    
                    cidadesList.push({
                        value: doc.id(),
                        label: doc.id()
                    })
                })
            }

            dispatch(setCidadesUf(cidadesList))
            dispatch(cidadesUfLoaded())

        })
        .catch((err) => {

        })
    }
}