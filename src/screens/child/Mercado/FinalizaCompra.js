//PADRÃO
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Text, Button, Spinner, View } from 'native-base'
import { Row, Grid, Col } from 'react-native-easy-grid'
import { connect } from 'react-redux'
//Components e utilitários internos
import Header from '../../../components/HeaderComponent'
import commonStyle from '../../../customization/commonStyles'
import FooterComponent from '../../../components/FooterComponent';
import { limpaLista } from '../../../store/actions/mercado'

class FinalizaCompra extends Component {

    voltar = () => {
        this.props.navigation.navigate('Home')
        this.props.onLimpaLista()
    }
 
    loadingOuNao = () => {
        if(this.props.isFinalizando){
            return(
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Spinner color='#C20114' />
                </View>
            )
        }else{
            return(
                <View>
                    <Grid>
                        <Row style={{marginTop: 40, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.tituloGrande}>Compra finalizada!</Text>
                        </Row>
                        <Row style={{margin: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{...styles.informacoesText, textAlign: 'center'}}>Você agora pode acompanhar o andamento da sua entrega pela aba "Entregas"</Text>
                        </Row>
                        <Row style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <Button style={{...styles.button, width: '60%'}} onPress={() => this.voltar()}>
                                <Text style={styles.buttonText}>Voltar</Text>
                            </Button>
                        </Row>
                    </Grid>
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
    buttonTextGrande: commonStyle.buttonTextGrande,
    button: commonStyle.button,
    titulo: commonStyle.tituloText,
    tituloGrande: commonStyle.superTituloText,
    buttonText: commonStyle.buttonTextNormal
})

const mapStateToProps = ( { mercado }) => {
    return {        
        isFinalizando: mercado.finalizandoCompra
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLimpaLista: () => dispatch(limpaLista()), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FinalizaCompra)