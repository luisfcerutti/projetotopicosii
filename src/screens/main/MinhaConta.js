//PADRÃO
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Content, Text, Spinner, Icon, Input, Item, Button } from 'native-base'
import { Row, Grid, Col } from 'react-native-easy-grid'
import Dialog from "react-native-dialog"
import { connect } from 'react-redux'
//Components e utilitários internos
import Header from '../../components/HeaderComponent'
import commonStyle from '../../customization/commonStyles'
import FooterComponent from '../../components/FooterComponent';
import { changePassword, editNome, changeEmail, editLocal } from '../../store/actions/user'

class MinhaConta extends Component {

    state = {
        novaSenha: '',
        repitaNovaSenha: '',
        senha: '',
        novoNome: '',
        novoEmail: '',
        tituloDialog: '',
        mensagemDialog: '',
        dialog: false,
        mode: 'padrao'
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.isChangingPassword && !this.props.isChangingPassword){
            this.setState({ tituloDialog: this.props.tituloSenha, mensagemDialog: this.props.mensagemSenha, dialog: true})
        }

        if(prevProps.isAlterandoDados && !this.props.isAlterandoDados){
            this.setState({ tituloDialog: this.props.tituloAlterandoDados, mensagemDialog: this.props.mensagemAlterandoDados, dialog: true})
        }
    }

    mudaSenha = () => {
        if(this.state.senha.trim().length>=6){

            if(this.state.novaSenha.trim().length>=6){
            
                if(this.state.novaSenha === this.state.repitaNovaSenha){
                    this.props.onAlteraSenha(this.state.senha, this.state.novaSenha)
                    this.setState({ senha: '', novaSenha: '', repitaNovaSenha: '', mode: 'padrao' })
                }else{
                    this.setState({tituloDialog: 'Atenção!', mensagemDialog: 'Os campos nova senha e repita nova senha devem ser idênticos.', dialog: true})
                }
                
            }else{
                this.setState({tituloDialog: 'Atenção!', mensagemDialog: 'Sua nova senha deve conter no mínimo 6 caracteres.', dialog: true})
            }

        }else{

            this.setState({tituloDialog: 'Atenção!', mensagemDialog: 'Sua senha contém no mínimo 6 caracteres.', dialog: true})
        
        }

    }

    mudaEmail = () => {

        if(this.state.senha.trim().length>=6){

            this.props.onEditEmail(this.state.senha, this.state.novoEmail, this.props.usuarioKey)
            this.setState({ senha: '', novoEmail: '', mode: 'padrao' })
             
        }else{
            this.setState({tituloDialog: 'Atenção!', mensagemDialog: 'Sua senha contém no mínimo 6 caracteres.', dialog: true})
        }

    }

    mudaNome = () => {
        if(this.state.novoNome.trim().length>5){
            this.props.onEditNome(this.props.usuarioKey, this.state.novoNome)
            this.setState({ novoNome: '', mode: 'padrao'})
        }else{
            this.setState({tituloDialog: 'Atenção!', mensagemDialog: 'Seu nome parece muito curto.', dialog: true})
        }
    }
    
    renderMode = () => {
        switch(this.state.mode){
            case 'padrao': {
                return(
                    <View>
                        <Row>
                           <Text>Meus Dados</Text>
                       </Row>
                       <Row>
                           <Text>
                               Nome: {this.props.nome}
                           </Text>
                       </Row>
                       <Row>
                           <Text>
                               Email: {this.props.email}
                           </Text>
                       </Row>
                       <Row>
                           <Button onPress={() => this.setState({mode: 'alteraDados'})}>
                               <Text>Alterar Dados</Text>
                           </Button>
                       </Row>
                       <Row>
                           <Button onPress={() => this.setState({mode: 'alteraEmail'})}>
                               <Text>Alterar Email</Text>
                           </Button>
                       </Row>
                       <Row>
                           <Button onPress={() => this.setState({mode: 'alteraSenha'})}>
                               <Text>Alterar Senha</Text>
                           </Button>
                       </Row>
                    </View>
                )
            }
            case 'alteraEmail': {
                return(
                    <View>
                        <Row>
                            <Text>
                                Alterar Email
                            </Text>
                        </Row>                        
                        <Row>
                            <Item style={{width: '100%'}}>
                                <Icon name="md-at"/>
                                <Input placeholder="Novo email" onChangeText={(text) => this.setState({novoEmail: text})}/>
                            </Item>
                        </Row>
                        <Row>
                            <Item style={{width: '100%'}}>
                                <Icon name="md-key"/>
                                <Input placeholder="Digite sua senha" 
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({senha: text})}/>
                            </Item>
                        </Row>
                        <Row>
                            <Button onPress={() => this.setState({mode: 'padrao'})}>
                                <Text>Cancelar</Text>
                            </Button>
                        </Row>
                        <Row>
                            <Button onPress={() => this.mudaEmail()}>
                                <Text>Alterar</Text>
                            </Button>
                        </Row>
                    </View>
                )
            }
            case 'alteraSenha': {
                return(
                    <View>
                        <Row>
                            <Text>
                                Alterar Senha
                            </Text>
                        </Row>                        
                        <Row>
                            <Item style={{width: '100%'}}>
                                <Icon name="md-key"/>
                                <Input placeholder="Digite sua senha" 
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({senha: text})}/>
                            </Item>
                        </Row>
                        <Row>
                            <Item style={{width: '100%'}}>
                                <Icon name="md-key"/>
                                <Input placeholder="Digite a nova senha" 
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({novaSenha: text})}/>
                            </Item>
                        </Row>
                        <Row>
                            <Item style={{width: '100%'}}>
                                <Icon name="md-key"/>
                                <Input placeholder="Repita a nova senha" 
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({repitaNovaSenha: text})}/>
                            </Item>
                        </Row>
                        <Row>
                            <Button onPress={() => this.setState({mode: 'padrao'})}>
                                <Text>Cancelar</Text>
                            </Button>
                        </Row>
                        <Row>
                            <Button onPress={() => this.mudaSenha()}>
                                <Text>Alterar</Text>
                            </Button>
                        </Row>
                    </View>
                )
            }
            case 'alteraDados': {
                return(
                    <View>
                        <Row>
                            <Text>
                                Alterar Dados
                            </Text>
                        </Row>                        
                        <Row>
                            <Item style={{width: '100%'}}>
                                <Icon name="md-person"/>
                                <Input placeholder="Digite o novo nome"
                                onChangeText={(text) => this.setState({novoNome: text})}/>
                            </Item>
                        </Row>
                        <Row>
                            <Button onPress={() => this.setState({mode: 'padrao'})}>
                                <Text>Cancelar</Text>
                            </Button>
                        </Row>
                        <Row>
                            <Button onPress={() => this.mudaNome()}>
                                <Text>Alterar</Text>
                            </Button>
                        </Row>
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

    loadingOuNao = () => {
        if(this.props.isAlterandoDados || this.props.isChangingPassword){
            return(
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Spinner color='#C20114' />
                </View>
            )
        }else{
            return(
                <View>
                    <Grid>
                       {this.renderMode()}
                    </Grid>
                </View>
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
                visible={this.state.dialog}>
                    <Dialog.Title style={{...styles.informacoesText, fontSize: 20, textAlign: 'center'}}>{this.state.tituloDialog}</Dialog.Title>
                    <Dialog.Description style={{...styles.informacoesText, fontSize: 18, textAlign: 'justify'}}>
                        {this.state.mensagemDialog}
                    </Dialog.Description>                    
                    <Dialog.Button color={'#003266'} bold={true} label="OK" onPress={() => this.setState({dialog: false, tituloDialog: '', mensagemDialog: ''})} />
                </Dialog.Container>
                <Header />
                <Content padder>
                    {this.loadingOuNao()}
                </Content>
                <FooterComponent />
            </Container>
        )
    }
    
}

const styles = StyleSheet.create({
    container: commonStyle.container,
    informacoesText: commonStyle.informacoesText
})


const mapStateToProps = ({ user }) => {
    return {
        nome: user.nome,
        email: user.email,
        usuarioKey: user.key,
        isChangingPassword: user.isChangingPassword,
        tituloSenha: user.tituloChangingPassword,
        mensagemSenha: user.mensagemChangingPassword,
        isAlterandoDados: user.isAlterandoDados,
        tituloAlterandoDados: user.tituloAlterandoDados,
        mensagemAlterandoDados: user.mensagemAlterandoDados
    }
}

const mapDispatchToProps = dispatch => {
    return {        
        onAlteraSenha: (senhaAtual, senha) => dispatch(changePassword(senhaAtual, senha)),
        onEditNome: (usuarioKey, novoNome) => dispatch(editNome(usuarioKey, novoNome)),       
        onEditEmail: (senha, novoEmail, usuarioKey) => dispatch(changeEmail(senha, novoEmail, usuarioKey)),
        onEditLocal: (usuarioKey, novaCidade, novaUf) => dispatch(editLocal(usuarioKey, novaCidade, novaUf))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MinhaConta)