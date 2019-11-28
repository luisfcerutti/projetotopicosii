//PADRÃO
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Text } from 'native-base'
import { connect } from 'react-redux'
//Components e utilitários internos
import Header from '../../../components/HeaderComponent'
import commonStyle from '../../../customization/commonStyles'
import FooterComponent from '../../../components/FooterComponent';

class FinalizaCompra extends Component {
 
    render(){
        return(
            <Container style={styles.container}>
                <Header />
                <Content padder>
                    <Text>Finaliza Compra</Text>
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

export default FinalizaCompra