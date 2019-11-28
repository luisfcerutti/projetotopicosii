//PADRÃO
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Text, Spinner } from 'native-base'
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
        novaCidade: '',
        novaUf: '',
        tituloDialog: '',
        mensagemDialog: '',
        dialog: false
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.isChangingPassword && !this.props.isChangingPassword){
            this.setState({ tituloDialog: this.props.tituloSenha, mensagemDialog: this.props.mensagemSenha, dialog: true})
        }

        if(prevProps.isAlterandoDados && !this.props.isAlterandoDados){
            this.setState({ tituloDialog: this.props.tituloAlterandoDados, mensagemDialog: this.props.mensagemAlterandoDados, dialog: true})
        }
    }

    mudaLocal = () => {
        if(this.state.novaCidade.trim().length>1){
            if(this.state.novaUf.length===2){
                this.props.onEditLocal(this.props.usuarioKey, this.state.novaCidade, this.state.novaUf)
                this.setState({ novaCidade: '' })
            }else{
                this.setState({tituloDialog: 'Atenção!', mensagemDialog: 'O campo UF deve conter os dois digitos referentes à Unidade da Federação.', dialog: true})
            }
        }else{
            this.setState({tituloDialog: 'Atenção!', mensagemDialog: 'O nome da cidade é muito pequeno.', dialog: true})
        }
    }

    mudaSenha = () => {
        if(this.state.senha.trim().length>=6){

            if(this.state.novaSenha.trim().length>=6){
            
                if(this.state.novaSenha === this.state.repitaNovaSenha){
                    this.props.onAlteraSenha(this.state.senha, this.state.novaSenha)
                    this.setState({ senha: '', novaSenha: '', repitaNovaSenha: '' })
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
            this.setState({ senha: '', novoEmail: '' })
             
        }else{
            this.setState({tituloDialog: 'Atenção!', mensagemDialog: 'Sua senha contém no mínimo 6 caracteres.', dialog: true})
        }

    }

    mudaNome = () => {
        if(this.state.novoNome.trim().length>5){
            this.props.onEditNome(this.props.usuarioKey, this.state.novoNome)
            this.setState({ novoNome: ''})
        }else{
            this.setState({tituloDialog: 'Atenção!', mensagemDialog: 'Seu nome parece muito curto.', dialog: true})
        }
    }

    componentDidMount(){
        this.setState({ novaUf: this.props.uf })
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
        cidade: user.cidade,
        uf: user.uf,
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