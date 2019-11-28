//PADRÃO
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Text } from 'native-base'
import { connect } from 'react-redux'
//Components e utilitários internos
import Header from '../../../components/HeaderComponent'
import commonStyle from '../../../customization/commonStyles'
import FooterComponent from '../../../components/FooterComponent';
import { alteraListaCompras } from '../../../store/actions/mercado'

class DetalhesCompra extends Component {

    finalizaCompra = () => {
        if(this.props.listaCompras.length>0){
            this.props.navigation.navigate('FinalizaCompra')
        }
    }

    addListaCompras = (item) => {
        let listaTemp = Object.assign([], this.props.listaCompras)
        listaTemp.push(item)
        this.props.onAlteraLista(listaTemp)
    }

    removeListaCompras = (index) => {
        let listaTemp = Object.assign([], this.props.listaCompras)
        listaTemp.splice(index, 1)
        this.props.onAlteraLista(listaTemp)
    }
 
    render(){
        return(
            <Container style={styles.container}>
                <Header />
                <Content padder>
                    <Text>Detalhes Compra</Text>
                </Content>
                <FooterComponent />
            </Container>
        )
    }
    
}

const styles = StyleSheet.create({
    container: commonStyle.container
})

const mapStateToProps = ( { mercado }) => {
    return {        
        listaCompras: mercado.listaCompras
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAlteraLista: (novaLista) => dispatch(alteraListaCompras(novaLista))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalhesCompra)

