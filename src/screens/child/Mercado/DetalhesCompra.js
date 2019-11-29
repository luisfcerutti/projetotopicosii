//PADRÃO
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Text, Button } from 'native-base'
import { Row, Grid, Col } from 'react-native-easy-grid'
import { connect } from 'react-redux'
import Dialog from "react-native-dialog"
import { Dropdown } from 'react-native-material-dropdown';
//Components e utilitários internos
import Header from '../../../components/HeaderComponent'
import commonStyle from '../../../customization/commonStyles'
import FooterComponent from '../../../components/FooterComponent';
import { alteraListaCompras, finalizaCompra } from '../../../store/actions/mercado'

class DetalhesCompra extends Component {

    state = {
        selectedLabel: null,
        selectedValue: null,
        dialog: false,
        tituloDialog: '',
        mensagemDialog: ''
    }

    onChangeText = (value, index) => {
        this.setState({ selectedValue: value, selectedLabel: this.props.metodosList[index].label })
    }  

    finalizaCompra = () => {
        if(this.props.selectedLabel!==null){
            this.props.onFinalizaCompra(this.props.usuarioKey, this.props.listaCompras, this.props.totalCompra, this.props.nomeMercado, this.state.selectedValue)
            this.props.navigation.navigate('FinalizaCompra')
        }else{
            this.setState({dialog: true, mensagemDialog: 'Selecione um método de pagamento!', tituloDialog: 'Atenção!'})
        }
        
    }
 
    render(){
        return(
            <Container style={styles.container}>
                <Header />
                <Dialog.Container
                headerStyle={{backgroundColor: 'ghostwhite'}} 
                contentStyle={{backgroundColor: 'ghostwhite'}}
                footerStyle={{backgroundColor: 'ghostwhite'}}
                visible={this.state.dialog}>
                    <Dialog.Title style={{...styles.informacoesText, fontSize: 20, textAlign: 'center'}}>{this.state.tituloDialog}</Dialog.Title>
                    <Dialog.Description style={{...styles.informacoesText, fontSize: 18, textAlign: 'justify'}}>
                        {this.state.mensagemDialog}
                    </Dialog.Description>                    
                    <Dialog.Button color={'#C20114'} bold={true} label="OK" onPress={() => this.setState({dialog: false})} />
                </Dialog.Container>
                <Content padder>
                    <Grid>
                        <Row>
                            <Text>Detalhes da Compra</Text>
                        </Row>
                        <Row>
                            <Text>Mercado: {this.props.nomeMercado}</Text>
                        </Row>
                        <Row>
                            <Text>Valor Total: {"R$ "+this.props.totalCompra}</Text>
                        </Row>
                        <Row>
                            <Text>Método de Pagamento:</Text>
                        </Row>
                        <Row>
                                <Dropdown
                                    containerStyle={{
                                        height: 40,
                                        width: '95%',
                                        borderColor: '#C20114',
                                        borderWidth: 0.5,
                                        borderRadius: 4,
                                        justifyContent: 'center'
                                    }}
                                    data={this.props.metodosList}
                                    itemTextStyle={{ ...styles.informacoesText, textAlign: 'center' }}
                                    labelTextStyle={{ ...styles.informacoesText, textAlign: 'center' }}
                                    style={{ fontFamily: 'Montserrat Medium', fontWeight: 'normal', textAlign: 'center' }}
                                    onChangeText={this.onChangeText}
                                    textColor='#C20114'
                                    inputContainerPadding={0}
                                    dropdownOffset={{ top: 5, left: 0 }}
                                    lineWidth={0}
                                />
                            </Row>
                            <Row>
                                <Button onPress={() => this.finalizaCompra()}>
                                    <Text>Finalizar</Text>
                                </Button>
                            </Row>
                    </Grid>
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

const mapStateToProps = ( { mercado, user }) => {
    return {
        usuarioKey: user.key,        
        listaCompras: mercado.listaCompras,
        totalCompra: mercado.totalCompra,
        nomeMercado: mercado.nome,
        metodosList: user.metodosList
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAlteraLista: (novaLista) => dispatch(alteraListaCompras(novaLista)),
        onFinalizaCompra: (userKey, listaCompras, valorCompra, nomeMercado, keyPgto) => dispatch(finalizaCompra(userKey, listaCompras, valorCompra, nomeMercado, keyPgto))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalhesCompra)

