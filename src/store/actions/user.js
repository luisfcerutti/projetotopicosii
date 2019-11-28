import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    LOADING_USER,
    USER_LOADED,
    ALTERANDO_DADOS,
    IS_AUTHENTICATING,
    USER_AUTHENTICATED,
    ERROR_AUTHENTICATION,
    PASSWORD_RESETED,
    RESETING_PASSWORD,
    CHANGING_PASSWORD,
    PASSWORD_CHANGED,
    DISMISS_ERROR_LOGIN,
    DADOS_ALTERADOS,    
    LOADING_METODOS_PAGAMENTO,
    METODOS_PAGAMENTO_LOADED,
    SET_METODOS_PAGAMENTO,
    LOADING_ENTREGAS,
    ENTREGAS_LOADED,
    SET_ENTREGAS
} from './actionTypes'
import firebase from 'react-native-firebase'

// LOGIN - REGISTRAR
/////////////////

export const userLogged = (user) => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export const logout = () => {
    return {
        type: USER_LOGGED_OUT
    }
}

export const loadingUser = () => {
    return {
        type: LOADING_USER
    }
}

export const userLoaded = () => {
    return {
        type: USER_LOADED
    }
}

export const isAuthenticating = () => {
    return {
        type: IS_AUTHENTICATING
    }
}

export const userAuthenticated = () => {
    return {
        type: USER_AUTHENTICATED
    }
}

export const errorAuthentication = (mensagem) => {
    return {
        type: ERROR_AUTHENTICATION,
        payload: mensagem
    }
}

export const dismissErrorLogin = () => {
    return {
        type: DISMISS_ERROR_LOGIN
    }
}

export const deslogar = () => {
    return dispatch => {

        dispatch(logout())

        if (firebase.auth().currentUser) {

            firebase.auth().signOut()

        }

    }
}

export const login = (user) => {
    return dispatch => {
        dispatch(isAuthenticating())
        firebase.auth().signInWithEmailAndPassword(user.email, user.senha)
            .then((res) => {
                firebase.firestore().collection('usuarios').doc(`${res.user.uid}`).get()
                    .then((res2) => {
                        if (res2.exists) {
                            let user = res2.data()
                            let userFinal = {
                                key: res.user.uid,
                                ...user
                            }
                            dispatch(userLogged(userFinal))
                            dispatch(fetchMetodosPagamento(res.user.uid))
                            dispatch(userAuthenticated())
                        }
                    })
                    .catch(() => {
                        dispatch(errorAuthentication({ titulo: 'Erro', mensagem: 'Ocorreu um erro ao sincronizar seus dados! Tente novamente!' }));
                    })
            })
            .catch((err) => {
                switch (err.code) {
                    case 'auth/invalid-email': {
                        dispatch(errorAuthentication({ titulo: 'Erro', mensagem: 'Email ou senha incorretos!' }));
                        break
                    }
                    case 'auth/user-disabled': {
                        dispatch(errorAuthentication({ titulo: 'Erro', mensagem: 'Usuário desabilitado!' }));
                        break
                    }
                    case 'auth/user-not-found': {
                        dispatch(errorAuthentication({ titulo: 'Erro', mensagem: 'Usuário não encontrado!' }));
                        break
                    }
                    case 'auth/wrong-password': {
                        dispatch(errorAuthentication({ titulo: 'Erro', mensagem: 'Email ou senha incorretos!' }));
                        break
                    }
                    default: {
                        dispatch(errorAuthentication({ titulo: 'Erro', mensagem: 'Ocorreu um erro ao sincronizar seus dados! Tente novamente!' }));
                        break
                    }
                }
            })

    }
}

export const registrar = (novoUsuario) => {
    return dispatch => {
        dispatch(isAuthenticating())
        firebase.auth().createUserWithEmailAndPassword(novoUsuario.email, novoUsuario.senha)
            .then((res) => {
                let novoUsuarioDados = {
                    nome: novoUsuario.nome,                    
                    email: novoUsuario.email,
                    cidade: novoUsuario.cidade,
                    uf: novoUsuario.uf
                }
                firebase.firestore().collection('usuarios').doc(`${res.user.uid}`).set(novoUsuarioDados)
                    .then(() => {
                        dispatch(userLogged({ ...novoUsuarioDados, key: res.user.uid }))
                        dispatch(userAuthenticated())
                    })
                    .catch((err) => {
                        dispatch(errorAuthentication({ titulo: 'Erro!', mensagem: 'Ocorreu um erro ao sincronizar seus dados! Tente novamente!' }));
                    })
            })
            .catch((err) => {
                switch (err.code) {
                    case 'auth/email-already-in-use': {
                        dispatch(errorAuthentication({ titulo: 'Erro!', mensagem: 'O email digitado já está em uso! Utilize a função "Esqueci minha senha"!' }));
                        break
                    }
                    case 'auth/invalid-email': {
                        dispatch(errorAuthentication({ titulo: 'Erro!', mensagem: 'O email digitado é inválido!' }));
                        break
                    }
                    case 'auth/weak-password': {
                        dispatch(errorAuthentication({ titulo: 'Erro!', mensagem: 'A senha digitada é muito fraca!' }));
                        break
                    }
                    default: {
                        dispatch(errorAuthentication({ titulo: 'Erro!', mensagem: 'Ocorreu um erro ao tentar realizar seu cadastro! Tente novamente!' }));
                        break
                    }
                }
            })
    }
}

// ALTERAÇÃO DE DADOS PESSOAIS - SENHA - EMAIL
/////////////////////////////////////////

export const changingPassword = () => {
    return {
        type: CHANGING_PASSWORD
    }
}

export const passwordChanged = (mensagem) => {
    return {
        type: PASSWORD_CHANGED,
        payload: mensagem
    }
}

export const changePassword = (senhaAtual, senha) => {
    return dispatch => {

        dispatch(changingPassword())

        let user = firebase.auth().currentUser

        let credencial = firebase.auth.EmailAuthProvider.credential(user.email, senhaAtual)

        user.reauthenticateWithCredential(credencial)
            .then(() => {
                firebase.auth().currentUser.updatePassword(senha)
                    .then(() => {
                        dispatch(passwordChanged({ titulo: 'Sucesso!', mensagem: 'Sua senha foi alterada!' }))
                    })
                    .catch((err) => {
                        dispatch(passwordChanged({ titulo: 'Erro!', mensagem: 'Ocorreu um erro ao tentar efetuar a troca da senha!' }))

                    })
            })
            .catch((err) => {
                dispatch(passwordChanged({ titulo: 'Erro!', mensagem: 'Ocorreu um erro ao tentar efetuar a troca da senha!' }))
            })

    }

}

export const resetingPassword = () => {
    return {
        type: RESETING_PASSWORD
    }
}

export const passwordReseted = (mensagem) => {
    return {
        type: PASSWORD_RESETED,
        payload: mensagem
    }
}


export const forgotPassword = (email) => {

    return dispatch => {

        dispatch(resetingPassword())

        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {

                dispatch(passwordReseted({ titulo: 'Email enviado!', mensagem: 'Você receberá um email com as instruções para alteração de senha!' }))
            
            })
            .catch((err) => {

                dispatch(passwordReseted({ titulo: 'Erro!', mensagem: 'Ocorreu um erro ao tentar enviar o email para redefinir sua senha! Tente novamente!' }))
            
            })
    }

}


export const changeEmail = (senhaAtual, novoEmail, usuarioKey) => {
    
    return dispatch => {

        dispatch(alterandoDados())

        let user = firebase.auth().currentUser

        let credencial = firebase.auth.EmailAuthProvider.credential(user.email, senhaAtual)

        user.reauthenticateWithCredential(credencial)
            .then(() => {
                firebase.auth().currentUser.updateEmail(novoEmail)
                    .then(() => {

                        firebase.firestore().collection('usuarios').doc(`${usuarioKey}`).update({ email: novoEmail })
                            .then(() => {
                                firebase.firestore().collection('usuarios').doc(`${usuarioKey}`).get()
                                    .then((res) => {
                                        if (res) {
                                            let user = res.data()
                                            let userFinal = {
                                                key: usuarioKey,
                                                ...user
                                            }
                                            dispatch(userLogged(userFinal))
                                            dispatch(dadosAlterados({ titulo: 'Sucesso!', mensagem: 'Você receberá um email com a confirmação da troca!' }))
                                        }
                                    })
                                    .catch(() => {
                                        dispatch(dadosAlterados({ titulo: 'Ops!', mensagem: 'Seu email foi alterado mas não foi possível sincronizar seus dados! Faça o login novamente!' }))
                                    })
                            })
                            .catch((err) => {
                                dispatch(dadosAlterados({ titulo: 'Ops!', mensagem: 'Seu email foi alterado mas ocorreu algum erro! Entre em contato com o suporte!' }))
                            })

                    })
                    .catch((err) => {
                        switch (err.code) {
                            case 'auth/invalid-email': {
                                dispatch(dadosAlterados({ titulo: 'Erro!', mensagem: 'Email inválido!' }))
                                break;
                            }
                            case 'auth/email-already-in-use': {
                                dispatch(dadosAlterados({ titulo: 'Erro!', mensagem: 'O email já está em uso!' }))
                                break;
                            }
                            case 'auth/requires-recent-login': {
                                dispatch(dadosAlterados({ titulo: 'Erro!', mensagem: 'Ocorreu um erro ao tentar efetuar a troca do email! Relogue e tente novamente!' }))
                                break;
                            }
                            default: {
                                dispatch(dadosAlterados({ titulo: 'Erro!', mensagem: 'Ocorreu um erro ao tentar efetuar a troca do email!' }))
                                break;
                            }
                        }
                    })
            })
            .catch((err) => {
                dispatch(dadosAlterados({ titulo: 'Erro!', mensagem: 'Ocorreu um erro ao tentar efetuar a troca do email!' }))
            })

    }
}

export const alterandoDados = () => {
    return {
        type: ALTERANDO_DADOS
    }
}

export const dadosAlterados = (mensagem) => {
    return {
        type: DADOS_ALTERADOS,
        payload: mensagem
    }
}

export const editNome = (usuarioKey, novoNome) => {
    return dispatch => {
        dispatch(alterandoDados())
        firebase.firestore().collection('usuarios').doc(`${usuarioKey}`).update({ nome: novoNome })
        .then(()=>{
            firebase.firestore().collection('usuarios').doc(`${usuarioKey}`).get()
            .then((res2) => {
                if (res2) {
                    let user = res2.data()
                    let userFinal = {
                        key: usuarioKey,
                        ...user
                    }
                    dispatch(userLogged(userFinal))
                    dispatch(dadosAlterados({ titulo: 'Sucesso!', mensagem: 'Seu nome foi alterado!' }))
                }
            })
            .catch(() => {
                dispatch(dadosAlterados({ titulo: 'Ops!', mensagem: 'Seus dados foram alterados mas não foi possível sincronizá-los! Faça o login novamente!' }))
            })            
        })
        .catch((err)=>{
            dispatch(dadosAlterados({ titulo: 'Erro!', mensagem: 'Ocorreu um erro ao tentar alterar seu nome!' }))
        })
    }
}

export const editLocal = (usuarioKey, novaCidade, novaUf) => {
    return dispatch => {
        dispatch(alterandoDados())
        firebase.firestore().collection('usuarios').doc(`${usuarioKey}`).update({ cidade: novaCidade, uf: novaUf })
        .then(()=>{
            firebase.firestore().collection('usuarios').doc(`${usuarioKey}`).get()
            .then((res2) => {
                if (res2) {
                    let user = res2.data()
                    let userFinal = {
                        key: usuarioKey,
                        ...user
                    }
                    dispatch(userLogged(userFinal))
                    dispatch(dadosAlterados({ titulo: 'Sucesso!', mensagem: 'Seu local foi alterado!' }))
                }
            })
            .catch(() => {
                dispatch(dadosAlterados({ titulo: 'Ops!', mensagem: 'Seu local foi alterado mas não foi possível sincronizar seus dados! Faça o login novamente!' }))
            }) 
        })
        .catch((err)=>{
            dispatch(dadosAlterados({ titulo: 'Erro!', mensagem: 'Ocorreu um erro ao tentar alterar o seu local!' }))
        })
    }
}

// MÉTODOS PAGAMENTO

export const loadingMetodosPagamento = () => {
    return {
        type: LOADING_METODOS_PAGAMENTO
    }
}

export const metodosPagamentoLoaded = () => {
    return {
        type: METODOS_PAGAMENTO_LOADED
    }
}

export const setMetodosPagamento = (metodos) => {
    return {
        type: SET_METODOS_PAGAMENTO,
        payload: metodos
    }
}

export const fetchMetodosPagamento = (userKey) => {
    return dispatch => {
        dispatch(loadingMetodosPagamento())
        let metodos = []
        firebase.firestore().collection('usuarios').doc(`${userKey}`).collection('metodosPagamento').get()
        .then((res) => {
            if(!res.empty){
                res.forEach((doc) => {
                    let metodo = {
                        key: doc.id,
                        ...doc.data()
                    }
                    metodos.push(metodo)
                })
            }
            dispatch(setMetodosPagamento(metodos))
            dispatch(metodosPagamentoLoaded())
        })
        .catch((err) => {

        })
    }
}

export const removeMetodoPagamento = (userKey, metodoKey) => {
    return dispatch => {
        dispatch(loadingMetodosPagamento())
        firebase.firestore().collection('usuarios').doc(`${userKey}`).collection('metodosPagamento').doc(`${metodoKey}`)
        .delete().then(() => {
            dispatch(fetchMetodosPagamento(userKey))
        })
        .catch((err) => {

        })
    }
}

export const addMetodoPagamento = (userKey, metodo) => {
    return dispatch => {
        dispatch(loadingMetodosPagamento())
        firebase.firestore().collection('usuarios').doc(`${userKey}`).collection('metodosPagamento').add(metodo)
        .then(() => {
            dispatch(fetchMetodosPagamento(userKey))
        })
        .catch((err) => {

        })
    }
}

// ENTREGAS

export const loadingEntregas = () => {
    return{
        type: LOADING_ENTREGAS
    }
}

export const entregasLoaded = () => {
    return {
        type: ENTREGAS_LOADED
    }
}

export const setEntregas = (entregas) => {
    return {
        type: SET_ENTREGAS,
        payload: entregas
    }
}

export const fetchEntregas = (userKey) => {
    return dispatch => {
        dispatch(loadingEntregas())
        let entregas = []
        firebase.firestore().collection('usuarios').doc(`${userKey}`).collection('entregas').get()
        .then((res) => {
            if(!res.empty){
                res.forEach((doc) => {
                    let entrega = {
                        key: doc.id,
                        ...doc.data()
                    }
                    entregas.push(entrega)
                })
            }
            dispatch(setEntregas(entregas))
            dispatch(entregasLoaded())
        })
        .catch((err) => {

        })
    }
}

