import { USER_LOGGED_IN, 
    USER_LOGGED_OUT,
    ALTERANDO_DADOS,
    ERROR_AUTHENTICATION,
    USER_AUTHENTICATED,
    IS_AUTHENTICATING,
    DISMISS_ERROR_LOGIN,
    CHANGING_PASSWORD,
    RESETING_PASSWORD,
    PASSWORD_RESETED,
    PASSWORD_CHANGED,
    DADOS_ALTERADOS,
    FINALIZANDO_CADASTRO,
    CADASTRO_FINALIZADO,
    ERRO_FINALIZACAO_CADASTRO,
    LOADING_METODOS_PAGAMENTO,
    METODOS_PAGAMENTO_LOADED,
    SET_METODOS_PAGAMENTO
    } from '../actions/actionTypes'

const initialState = {
    //DADOS USUÁRIO
    ///////////////
    email: '',
    key: '',
    nome: '',
    cidade: '',
    uf: '',
    dataNascimento: '',
    // LOGIN E ALTERAÇÃO DE DADOS
    ////////////
    isAuthenticating: false,
    isAuthenticated: false,
    erroLogin: false,
    tituloErroLogin: '',
    mensagemErroLogin: '',
    isAlterandoDados: false,
    resetingPassword: false,
    isChangingPassword: false,
    mensagemChangingPassword: '',
    mensagemResetingPassword: '',
    tituloChangingPassword: '',
    tituloResetingPassword: '',
    tituloAlterandoDados: '',
    mensagemAlterandoDados: '',
    // MÉTODOS PAGAMENTO
    metodosPagamento: [],
    isLoadingMetodos: false    
    
}

const reducer = (state=initialState, action) => {

    switch(action.type){
        case USER_LOGGED_IN: {
            return {
                ...state,
                ...action.payload
            }
        }        
        case USER_LOGGED_OUT: {
            return{
                ...state,
                ...initialState
            }
        }
        case ERROR_AUTHENTICATION: {
            return{
                ...state,
                isAuthenticating: false,
                isAuthenticated: false,
                erroLogin: true,
                mensagemErroLogin: action.payload.mensagem,
                tituloErroLogin: action.payload.titulo
            }
        }
        case USER_AUTHENTICATED: {
            return{
                ...state,
                isAuthenticating: false,
                isAuthenticated: true,
                erroLogin: false,
                mensagemErroLogin: '',
                tituloErroLogin: ''
            }
        }
        case IS_AUTHENTICATING: {
            return{
                ...state,
                isAuthenticating: true,
                isAuthenticated: false,
                erroLogin: false,
                tituloErroLogin: '',
                mensagemErroLogin: ''
            }
        }
        case DISMISS_ERROR_LOGIN: {
            return {
                ...state,
                erroLogin: false,
                tituloErroLogin: '',
                mensagemErroLogin: ''
            }
        }      
        case ALTERANDO_DADOS: {
            return{
                ...state,
                isAlterandoDados: true
            }
        }
        case DADOS_ALTERADOS: {
            return {
                ...state,
                isAlterandoDados: false,
                tituloAlterandoDados: action.payload.titulo,
                mensagemAlterandoDados: action.payload.mensagem
            }
        } 
        case CHANGING_PASSWORD: {
            return {
                ...state,
                isChangingPassword: true
            }
        }
        case PASSWORD_CHANGED: {
            return {
                ...state,
                isChangingPassword: false,
                mensagemChangingPassword: action.payload.mensagem,
                tituloChangingPassword: action.payload.titulo
            }
        }
        case RESETING_PASSWORD: {
            return {
                ...state,
                resetingPassword: true
            }
        }
        case PASSWORD_RESETED: {
            return {
                ...state,
                resetingPassword: false,
                mensagemResetingPassword: action.payload.mensagem,
                tituloResetingPassword: action.payload.titulo
            }
        } 
        case LOADING_METODOS_PAGAMENTO: {
            return {
                ...state,
                isLoadingMetodos: true
            }
        }
        case METODOS_PAGAMENTO_LOADED: {
            return {
                ...state,
                isLoadingMetodos: false
            }
        }
        case SET_METODOS_PAGAMENTO: {
            return{
                ...state,
                metodosPagamento: action.payload
            }
        }       
        default: {
            return state 
        }    
    }
    
}

export default reducer