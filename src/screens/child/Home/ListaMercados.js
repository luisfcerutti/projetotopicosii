//PADRÃO
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Text, Spinner } from 'native-base'
import { connect } from 'react-redux'
//Components e utilitários internos
import Header from '../../../components/HeaderComponent'
import commonStyle from '../../../customization/commonStyles'
import FooterComponent from '../../../components/FooterComponent';

class ListaMercados extends Component {
 
    render(){
        return(
            <Container style={styles.container}>
                <Header />
                <Content padder>
                    <Text>Lista Mercados</Text>
                </Content>
                <FooterComponent />
            </Container>
        )
    }
    
}

const styles = StyleSheet.create({
    container: commonStyle.container
})

const mapStateToProps = ( { cidade }) => {
    return {        
        listaMercados: cidade.listaMercados,
        isLoadingCidade: cidade.isLoadingCidade
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onPesquisaCidadesUf: (uf) => dispatch(fetchCidadesUf(uf)),
        onSelecionaCidade: (cidade) => dispatch(fetchMercadosCidade(cidade))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListaMercados)