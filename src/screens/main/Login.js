//PADRÃO
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Content, Text, Spinner, Card, Button, Input, Item, Icon } from 'native-base'
import { Row, Grid, Col } from 'react-native-easy-grid'
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
        
        if(this.state.dialog===true && this.state.mode==='Login'){
            this.setState({
                dialog: false,
                user: { 
                    email: '', 
                    password: '' 
                }            
            })
        }
        if(this.state.dialog===true && this.state.mode==='Registro'){
            this.setState({
                dialog: false,
                newUser: {
                    email: '',
                    password: '',
                    rptPassword: '',
                    nome: ''
                }
            })
        }
        if(this.state.dialog===true && this.state.mode==='EsqueciSenha'){
            this.setState({
                dialog: false,
                emailEsqueciSenha: ''
            })
        }
    }

    renderMode = () => {
        switch(this.state.mode){
            case 'Login': {
                return(
                    <View>
                        <Grid>
                            <Row>
                                <Text>Login</Text>
                            </Row>
                            <Row>
                                <Item style={{width: '100%'}}>
                                    <Icon name="md-at"/>
                                    <Input placeholder="Email" onChangeText={(text) => this.setState({user: {...this.state.user, email: text}})}/>
                                </Item>
                            </Row>
                            <Row>
                                <Item style={{width: '100%'}}>
                                    <Icon name="md-key"/>
                                    <Input 
                                    placeholder="Senha" 
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({user: {...this.state.user, password: text}})}/>
                                </Item>
                            </Row>
                            <Row>
                                <Button transparent onPress={() => this.setState({mode: 'EsqueciSenha'})}>
                                    <Text>Esqueci minha senha</Text>
                                </Button>
                            </Row>
                            <Row>
                                <Button onPress={() => this.login()}>
                                    <Text>Acessar</Text>
                                </Button>
                            </Row>
                        </Grid>
                    </View>
                )
            }
            case 'Registro': {
                return (
                    <View>
                        <Grid>
                            <Row>
                                <Text>Criar Conta</Text>
                            </Row>
                            <Row>
                                <Item style={{width: '100%'}}>
                                    <Icon name="md-person"/>
                                    <Input placeholder="Nome" onChangeText={(text) => this.setState({newUser: {...this.state.newUser, nome: text}})}/>
                                </Item>
                            </Row>
                            <Row>
                                <Item style={{width: '100%'}}>
                                    <Icon name="md-at"/>
                                    <Input placeholder="Email" onChangeText={(text) => this.setState({newUser: {...this.state.newUser, email: text}})}/>
                                </Item>
                            </Row>
                            <Row>
                                <Item style={{width: '100%'}}>
                                    <Icon name="md-key"/>
                                    <Input placeholder="Senha" 
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({newUser: {...this.state.newUser, password: text}})}/>
                                </Item>
                            </Row>
                            <Row>
                                <Item style={{width: '100%'}}>
                                    <Icon name="md-key"/>
                                    <Input placeholder="Repita a Senha"
                                    secureTextEntry={true} 
                                    onChangeText={(text) => this.setState({newUser: {...this.state.newUser, rptPassword: text}})}/>
                                </Item>
                            </Row>
                            <Row>
                                <Button onPress={() => this.registrar()}>
                                    <Text>Criar Conta</Text>
                                </Button>
                            </Row>
                        </Grid>
                    </View>
                )
            }
            case 'EsqueciSenha': {
                return(
                    <View>
                        <Grid>
                            <Row>
                                <Text>Esqueci a Senha</Text>
                            </Row>                           
                            <Row>
                                <Item style={{width: '100%'}}>
                                    <Icon name="md-at"/>
                                    <Input placeholder="Email" onChangeText={(text) => this.setState({emailEsqueciSenha: text})}/>
                                </Item>
                            </Row>                            
                            <Row>
                                <Button onPress={() => this.esqueciMinhaSenha()}>
                                    <Text>Enviar</Text>
                                </Button>
                            </Row>
                            <Row>
                                <Button onPress={() => this.setState({mode: 'Login'})}>
                                    <Text>Voltar</Text>
                                </Button>
                            </Row>
                        </Grid>
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

    componentDidUpdate = prevProps => {
        if(prevProps.isAuthenticating && !this.props.isAuthenticating){
            if(!prevProps.isAuthenticated && this.props.isAuthenticated){                
                    this.props.navigation.navigate('Acesso')                           
            }
        }
    }

    loadingOuRender = () => {
        if(this.props.isAuthenticating){
            return(
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Spinner color='#C20114' />
                </View>
            )
        }else{
            return(
                <Content padder>
                    {this.renderMode()}
                    <Grid style={{marginTop: 20}}>
                        <Row>
                            <Col>
                                <Button onPress={() => this.setState({mode: 'Login'})}>
                                    <Text>Login</Text>
                                </Button>
                            </Col>
                            <Col>
                                <Button onPress={() => this.setState({mode: 'Registro'})}>
                                    <Text>Registrar</Text>
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
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
                    <Dialog.Button color={'#C20114'} bold={true} label="OK" onPress={() => { this.props.onDismissError(); this.setState({ user: { ...this.state.user, email: '', senha: '' }}) }} />
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
                    <Dialog.Button color={'#C20114'} bold={true} label="OK" onPress={() => this.handleFechaDialog()} />
                </Dialog.Container>
                    {this.loadingOuRender()}
                </Container>
            )
        }
        
}
    


const styles = StyleSheet.create({
    container: commonStyle.container,
    informacoesText: commonStyle.informacoesText
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