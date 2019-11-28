//PADRÃO
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Content, Text, Spinner } from 'native-base'
import { Row, Grid, Col } from 'react-native-easy-grid'
import { connect } from 'react-redux'
//Components e utilitários internos
import Header from '../../../components/HeaderComponent'
import commonStyle from '../../../customization/commonStyles'
import FooterComponent from '../../../components/FooterComponent';
import { alteraListaCompras } from '../../../store/actions/mercado'

class DetalhesMercado extends Component {

    state = {
        mode: 'listaMercado'
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

    encerraCompra = () => {
        if(this.props.listaCompras.length>0){
            this.props.navigation.navigate('DetalhesCompra')
        }
    }

    renderMode = () => {
        switch(this.state.mode){
            case 'listaMercado': {
                return(
                    <View>

                    </View>
                )
            }
            case 'listaCompras': {
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
        if(this.props.isLoading){
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
    container: commonStyle.container
})


const mapStateToProps = ( { mercado }) => {
    return {        
        nomeMercado: mercado.nome,
        classificacao: mercado.classificacao,
        listaProdutos: mercado.listaProdutos,
        listaCompras: mercado.listaCompras,
        isLoading: mercado.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAlteraLista: (novaLista) => dispatch(alteraListaCompras(novaLista))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalhesMercado)