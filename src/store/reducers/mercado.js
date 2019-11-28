import { 
    SET_PRODUTOS_MERCADO, 
    SET_MERCADO, 
    ALTERA_LISTA_COMPRAS,
    LOADING_MERCADO,
    MERCADO_LOADED,
    FINALIZANDO_COMPRA,
    COMPRA_FINALIZADA
} from '../actions/actionTypes'

const initialState = {
    nome: '',
    cnpj: '',
    classificacao: '',
    numeroUsuarios: null,
    listaProdutos: {
        frutas: [],
        alimentos: [],
        produtosLimpeza: []
    },
    listaCompras: [],
    isLoading: false,
    finalizandoCompra: false
}

const reducer = (state=initialState, action) => {

    switch(action.type){
        case SET_PRODUTOS_MERCADO: {
            return {
                ...state,
                listaProdutos: action.payload
            }
        }
        case SET_MERCADO: {
            return {
                ...state,
                ...action.payload
            }
        }
        case ALTERA_LISTA_COMPRAS: {
            return {
                ...state,
                listaCompras: action.payload
            }
        }
        case LOADING_MERCADO: {
            return {
                ...state,
                isLoading: true
            }
        }
        case MERCADO_LOADED: {
            return {
                ...state,
                isLoading: false
            }
        }
        case FINALIZANDO_COMPRA: {
            return {
                ...state,
                finalizandoCompra: true
            }
        }
        case COMPRA_FINALIZADA: {
            return {
                ...state,
                finalizandoCompra: false,
                listaCompras: []
            }
        }             
        default: {
            return state 
        }    
    }
    
}

export default reducer