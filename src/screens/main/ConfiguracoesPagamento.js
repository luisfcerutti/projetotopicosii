//PADRÃO
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Content, Text, Spinner } from 'native-base'
import { Row, Grid, Col } from 'react-native-easy-grid'
import { connect } from 'react-redux'
//Components e utilitários internos
import Header from '../../components/HeaderComponent'
import commonStyle from '../../customization/commonStyles'
import FooterComponent from '../../components/FooterComponent';
import { addMetodoPagamento, removeMetodoPagamento } from '../../store/actions/user'

class ConfiguracoesPagamento extends Component {

    state = {
        novoMetodo: {}
    }

    loadingOuNao = () => {
        if(this.props.isLoadingMetodos){
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
    titulo: commonStyle.tituloText
})


const mapStateToProps = ( { user }) => {
    return {        
        usuarioKey: user.key,
        isLoadingMetodos: user.isLoadingMetodos,
        metodosPagamento: user.metodosPagamento
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAddMetodo: (userKey, metodo) => dispatch(addMetodoPagamento(userKey, metodo)),
        onRemoveMetodo: (userKey, metodoKey) => dispatch(removeMetodoPagamento(userKey, metodoKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfiguracoesPagamento)