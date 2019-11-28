//PADRÃO
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Text, Spinner } from 'native-base'
import { Row, Grid, Col } from 'react-native-easy-grid'
import { connect } from 'react-redux'
//Components e utilitários internos
import Header from '../../../components/HeaderComponent'
import commonStyle from '../../../customization/commonStyles'
import FooterComponent from '../../../components/FooterComponent';

class DetalhesMercado extends Component {
 
    render(){
        return(
            <Container style={styles.container}>
                <Header />
                <Content padder>
                    <Text>Detalhes Mercado</Text>
                </Content>
                <FooterComponent />
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
        //onLogin: (user) => dispatch(login(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalhesMercado)