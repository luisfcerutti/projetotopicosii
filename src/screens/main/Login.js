//PADRÃO
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Text, Spinner } from 'native-base'
import Dialog from "react-native-dialog"
import { connect } from 'react-redux'
//Components e utilitários internos
import Header from '../../components/HeaderComponent'
import commonStyle from '../../customization/commonStyles'
import FooterComponent from '../../components/FooterComponent';
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
        emailEsqueciSenha: ''

    }

    componentDidMount(){
        this.props.onDeslogar()
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
                    {this.loadingOuRender()}
                </Container>
            )
        }
        
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