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
                        <Row style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                           <Text style={styles.tituloGrande}>Meus Dados</Text>
                       </Row>
                       <Row style={{marginTop: 40}}>
                           <Text style={styles.informacoesText}>
                               {"  "}Nome: {this.props.nome}
                           </Text>
                       </Row>
                       <Row style={{marginTop: 20, marginBottom: 20}}>
                           <Text style={styles.informacoesText}>
                               {"  "}Email: {this.props.email}
                           </Text>
                       </Row>
                       <Row style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                           <Button style={styles.button} onPress={() => this.setState({mode: 'alteraDados'})}>
                               <Text style={styles.buttonText}>Alterar Dados</Text>
                           </Button>
                       </Row>
                       <Row style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                           <Button style={styles.button} onPress={() => this.setState({mode: 'alteraEmail'})}>
                               <Text style={styles.buttonText}>Alterar Email</Text>
                           </Button>
                       </Row>
                       <Row style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                           <Button style={styles.button} onPress={() => this.setState({mode: 'alteraSenha'})}>
                               <Text style={styles.buttonText}>Alterar Senha</Text>
                           </Button>
                       </Row>
                    </View>
                )
            }
            case 'alteraEmail': {
                return(
                    <View>
                        <Row style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.tituloGrande}>
                                Alterar Email
                            </Text>
                        </Row>                        
                        <Row style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <Item style={{width: '100%'}}>
                                <Icon name="md-at" style={{color: '#C20114'}}/>
                                <Input style={styles.informacoesText} placeholder="Novo email" onChangeText={(text) => this.setState({novoEmail: text})}/>
                            </Item>
                        </Row>
                        <Row style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <Item style={{width: '100%'}}>
                                <Icon name="md-key" style={{color: '#C20114'}}/>
                                <Input style={styles.informacoesText} placeholder="Digite sua senha" 
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({senha: text})}/>
                            </Item>
                        </Row>
                        <Row style={{marginTop: 20}}>
                            <Col style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Button bordered style={{borderColor: '#C20114', alignItems: 'center', justifyContent: 'center', borderRadius: 8}} onPress={() => this.setState({mode: 'padrao'})}>
                                    <Text style={{...styles.buttonText, color: '#C20114'}}>Cancelar</Text>
                                </Button>
                            </Col>
                            <Col style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Button style={styles.button} onPress={() => this.mudaEmail()}>
                                    <Text style={styles.buttonText}>Alterar</Text>
                                </Button>
                            </Col>
                        </Row>
                    </View>
                )
            }
            case 'alteraSenha': {
                return(
                    <View>
                        <Row style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.tituloGrande}>
                                Alterar Senha
                            </Text>
                        </Row>                        
                        <Row style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <Item style={{width: '100%'}}>
                                <Icon name="md-key" style={{color: '#C20114'}}/>
                                <Input style={styles.informacoesText} placeholder="Digite sua senha" 
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({senha: text})}/>
                            </Item>
                        </Row>
                        <Row style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <Item style={{width: '100%'}}>
                                <Icon name="ios-lock" style={{color: '#C20114'}}/>
                                <Input style={styles.informacoesText} placeholder="Digite a nova senha" 
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({novaSenha: text})}/>
                            </Item>
                        </Row>
                        <Row style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <Item style={{width: '100%'}}>
                                <Icon name="ios-lock" style={{color: '#C20114'}}/>
                                <Input style={styles.informacoesText} placeholder="Repita a nova senha" 
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({repitaNovaSenha: text})}/>
                            </Item>
                        </Row>
                        <Row style={{marginTop: 20}}>
                            <Col style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Button bordered style={{borderColor: '#C20114', alignItems: 'center', justifyContent: 'center', borderRadius: 8}} onPress={() => this.setState({mode: 'padrao'})}>
                                    <Text style={{...styles.buttonText, color: '#C20114'}}>Cancelar</Text>
                                </Button>
                            </Col>
                            <Col style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Button style={styles.button} onPress={() => this.mudaSenha()}>
                                    <Text style={styles.buttonText}>Alterar</Text>
                                </Button>
                            </Col>
                        </Row>
                    </View>
                )
            }
            case 'alteraDados': {
                return(
                    <View>
                        <Row style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.tituloGrande}>
                                Alterar Dados
                            </Text>
                        </Row>                        
                        <Row style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <Item style={{width: '100%'}}>
                                <Icon name="md-person" style={{color: '#C20114'}}/>
                                <Input style={styles.informacoesText} placeholder="Digite o novo nome"
                                onChangeText={(text) => this.setState({novoNome: text})}/>
                            </Item>
                        </Row >
                        <Row style={{marginTop: 20}}>
                            <Col style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Button bordered style={{borderColor: '#C20114', alignItems: 'center', justifyContent: 'center', borderRadius: 8}} onPress={() => this.setState({mode: 'padrao'})}>
                                    <Text style={{...styles.buttonText, color: '#C20114'}}>Cancelar</Text>
                                </Button>
                            </Col>
                            <Col style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Button style={styles.button} onPress={() => this.mudaNome()}>
                                    <Text style={styles.buttonText}>Alterar</Text>
                                </Button>
                            </Col>
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
                    <Grid style={{alignItems: 'center', justifyContent: 'center'}}> 
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
    informacoesText: commonStyle.informacoesText,
    buttonTextGrande: commonStyle.buttonTextGrande,
    button: commonStyle.button,
    titulo: commonStyle.tituloText,
    tituloGrande: commonStyle.superTituloText,
    buttonText: commonStyle.buttonTextNormal
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