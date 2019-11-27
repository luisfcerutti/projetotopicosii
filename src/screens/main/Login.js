//PADRÃO
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Text, Spinner } from 'native-base'
import Dialog from "react-native-dialog"
import { connect } from 'react-redux'
//Components e utilitários internos
import commonStyle from '../../customization/commonStyles'
import { login, registrar, dismissErrorLogin, forgotPassword, deslogar } from '../../store/actions/user'

class Login extends Component {

    state = {
        mode: 'Login',
        user: {
            email: '',
            password: ''
        },
        newUser: {
            email: '',
            password: '',
            rptPassword: '',
            cidade: '',
            uf: '',
            nome: ''
        },
        emailEsqueciSenha: '',
        dialog: false,
        mensagemDialog: '',
        tituloDialog: ''

    }

    componentDidMount(){
        this.props.onDeslogar()
    }

    login = () => {
        if(this.state.user.email.trim().length>5 && this.state.user.password.trim().length>6){
            this.props.onLogin(this.state.user)
        }else{
            this.setState({dialog: true, mensagemDialog: 'Os dados informados são muito curtos para tentar acessar!', tituloDialog: 'Ops!'})
        }
    }

    registrar = () => {
        if(this.state.newUser.email.trim().length>5){
            if(this.state.newUser.password.trim().length>6){
                if(this.state.newUser.password===this.state.newUser.rptPassword){
                    if(this.state.newUser.nome.trim().length>3){
                        this.props.onRegistrar(this.state.newUser)
                    }else{
                        this.setState({dialog: true, mensagemDialog: 'É necessário informar seu nome!', tituloDialog: 'Ops!'})
                    }            
                }else{
                    this.setState({dialog: true, mensagemDialog: 'As senhas devem ser idênticas!', tituloDialog: 'Ops!'})
                }            
            }else{
                this.setState({dialog: true, mensagemDialog: 'A senha inserida é muito curta!', tituloDialog: 'Ops!'})
            }
        }else{
            this.setState({dialog: true, mensagemDialog: 'O email inserido parece inválido!', tituloDialog: 'Ops!'})
        }
    }

    esqueciMinhaSenha = () => {
        if(this.state.emailEsqueciSenha.trim().length>5){
            this.props.onEsqueciSenha(this.state.emailEsqueciSenha)
        }else{
            this.setState({dialog: true, mensagemDialog: 'O email inserido é muito curto', tituloDialog: 'Ops!'})
        }
    }

    handleFechaDialog = () => {
        this.setState({dialog: false})
        if(this.state.mode==='Login'){
            this.setState({
                user: { 
                    email: '', 
                    password: '' 
                }            
            })
        }
        if(this.state.mode==='Registro'){
            this.setState({
                newUser: {
                    email: '',
                    password: '',
                    rptPassword: '',
                    cidade: '',
                    uf: '',
                    nome: ''
                }
            })
        }
        if(this.state.mode==='EsqueciSenha'){
            this.setState({
                emailEsqueciSenha: ''
            })
        }
    }

    renderMode = () => {
        switch(this.state.mode){
            case 'Login': {
                return(
                    <View>
                        <Text>Login</Text>
                    </View>
                )
            }
            case 'Registro': {
                return (
                    <View>
                        <Text>Registro</Text>
                    </View>
                )
            }
            case 'EsqueciSenha': {
                return(
                    <View>
                        <Text>Esqueci senha</Text>
                    </View>
                )
            }
            default: {
                return(
                    <View>

                    </View>
                )
            }
        }
    }

    loadingOuRender = () => {
        if(this.props.isAuthenticating){
            return(
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Spinner color='#003266' />
                </View>
            )
        }else{
            return(
                <Content padder>
                    <Text>Login</Text>
                    {this.renderMode()}
                </Content>
            )
        }
    }
 
    render(){        
        
            return(
                <Container style={styles.container}>
                <Dialog.Container
                headerStyle={{backgroundColor: 'ghostwhite'}} 
                contentStyle={{backgroundColor: 'ghostwhite'}}
                footerStyle={{backgroundColor: 'ghostwhite'}}
                visible={this.props.erroLogin}>
                    <Dialog.Title style={{...styles.informacoesText, fontSize: 20, textAlign: 'center'}}>{this.props.tituloErroLogin}</Dialog.Title>
                    <Dialog.Description style={{...styles.informacoesText, fontSize: 18, textAlign: 'justify'}}>
                        {this.props.mensagemErroLogin}
                    </Dialog.Description>                    
                    <Dialog.Button color={'#003266'} bold={true} label="OK" onPress={() => { this.props.onDismissError(); this.setState({ user: { ...this.state.user, email: '', senha: '' }}) }} />
                </Dialog.Container>
                <Dialog.Container
                headerStyle={{backgroundColor: 'ghostwhite'}} 
                contentStyle={{backgroundColor: 'ghostwhite'}}
                footerStyle={{backgroundColor: 'ghostwhite'}}
                visible={this.state.dialog}>
                    <Dialog.Title style={{...styles.informacoesText, fontSize: 20, textAlign: 'center'}}>{this.state.tituloDialog}</Dialog.Title>
                    <Dialog.Description style={{...styles.informacoesText, fontSize: 18, textAlign: 'justify'}}>
                        {this.state.mensagemDialog}
                    </Dialog.Description>                    
                    <Dialog.Button color={'#003266'} bold={true} label="OK" onPress={this.handleFechaDialog()} />
                </Dialog.Container>
                    {this.loadingOuRender()}
                </Container>
            )
        }
        
}
    


const styles = StyleSheet.create({
    container: commonStyle.container
})

const mapStateToProps = ( { user }) => {
    return {        
        isAuthenticated: user.isAuthenticated,
        isAuthenticating: user.isAuthenticating,
        erroLogin: user.erroLogin,
        mensagemErroLogin: user.mensagemErroLogin,
        tituloErroLogin: user.tituloErroLogin
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLogin: (user) => dispatch(login(user)),
        onRegistrar: (novoUser) => dispatch(registrar(novoUser)),
        onDismissError: () => dispatch(dismissErrorLogin()),
        onEsqueciSenha: (email) => dispatch(forgotPassword(email)),
        onDeslogar: () => dispatch(deslogar()) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)