//PADRÃO
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Content, Text, Spinner } from 'native-base'
import { Row, Grid, Col } from 'react-native-easy-grid'
import { connect } from 'react-redux'
//Components e utilitários internos
import Header from '../../components/HeaderComponent'
import commonStyle from '../../customization/commonStyles'
import FooterComponent from '../../components/FooterComponent'
import { fetchEntregas, alteraLocalEntrega } from '../../store/actions/user'

class ConfiguracoesEntrega extends Component {

    state = {
        mode: 'configuraEndereco',
        localEntrega: {
            rua: '',
            complemento: '',
            numero: '',
            bairro: ''
        }
    }

    alteraEntrega = () => {
        this.props.onAlteraEntrega(this.state.localEntrega)
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.isLoadingEntregas && !this.props.isLoadingEntregas){
            this.setState({ localEntrega: { ...this.props.configuracaoEntrega }})
        }
    }

    renderMode = () => {
        switch(this.state.mode){
            case 'configuraEndereco': {
                return(
                    <View>

                    </View>
                )
            }
            case 'minhasEncomendas': {
                return (
                    <View>

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
        if(this.props.isLoadingEntregas){
            return(
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Spinner color='#C20114' />
                </View>
            )
        }else{
            return(
                <View>
                    {this.renderMode()}
                </View>
            )
        }
    }
 
    render(){
        return(
            <Container style={styles.container}>
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


const mapStateToProps = ( { user }) => {
    return {        
        usuarioKey: user.key,
        configuracaoEntrega: user.configuracaoEntrega,
        entregas: user.minhasEntregas,
        isLoadingEntregas: user.isLoadingEntregas
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchEntregas: (userKey) => dispatch(fetchEntregas(userKey)),
        onAlteraEntrega: (novoLocal, userKey) => dispatch(alteraLocalEntrega(novoLocal, userKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfiguracoesEntrega)