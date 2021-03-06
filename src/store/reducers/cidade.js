import { LOADING_CIDADE, 
    CIDADE_LOADED, 
    SET_MERCADOS_CIDADE, 
    LOADING_CIDADES_UF, 
    CIDADES_UF_LOADED, 
    SET_CIDADES_UF, 
    SET_CIDADE,
    SET_UF} from '../actions/actionTypes'

const initialState = {
    cidadesList: [],
    listaMercados: [],
    isLoadingCidade: false,
    isLoadingCidadesUf: false,
    cidadeSelecionada: '',
    ufSelecionado: ''
}

const reducer = (state=initialState, action) => {

    switch(action.type){
        case SET_CIDADE: {
            return{
                ...state,
                cidadeSelecionada: action.payload
            }
        }
        case SET_UF: {
            return{
                ...state,
                ufSelecionado: action.payload
            }
        }
        case LOADING_CIDADE: {
            return{
                ...state,
                isLoadingCidade: true
            }
        }
        case CIDADE_LOADED: {
            return{
                ...state,
                isLoadingCidade: false
            }
        }
        case SET_MERCADOS_CIDADE: {
            return{
                ...state,
                listaMercados: action.payload
            }
        }
        case LOADING_CIDADES_UF: {
            return{
                ...state,
                isLoadingCidadesUf: true
            }
        }
        case CIDADES_UF_LOADED: {
            return {
                ...state,
                isLoadingCidadesUf: false
            }
        }
        case SET_CIDADES_UF: {
            return {
                ...state,
                cidadesList: action.payload
            }
        }             
        default: {
            return state 
        }    
    }
    
}

export default reducer