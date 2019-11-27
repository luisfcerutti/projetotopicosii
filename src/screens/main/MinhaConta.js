//PADRÃO
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Text } from 'native-base'
//Components e utilitários internos
import Header from '../../components/HeaderComponent'
import commonStyle from '../../customization/commonStyles'
import FooterComponent from '../../components/FooterComponent';

class MinhaConta extends Component {
 
    render(){
        return(
            <Container style={styles.container}>
                <Header />
                <Content padder>
                    <Text>Minha Conta</Text>
                </Content>
                <FooterComponent />
            </Container>
        )
    }
    
}

const styles = StyleSheet.create({
    container: commonStyle.container
})

export default MinhaConta