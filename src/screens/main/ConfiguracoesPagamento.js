//PADRÃO
import React, { Component } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { Container, Content, Text, Spinner, Button, Card, CardItem, Body } from 'native-base'
import { Row, Grid, Col } from 'react-native-easy-grid'
import { connect } from 'react-redux'
import { CreditCardInput } from "react-native-credit-card-input";
//Components e utilitários internos
import Header from '../../components/HeaderComponent'
import commonStyle from '../../customization/commonStyles'
import FooterComponent from '../../components/FooterComponent';
import { addMetodoPagamento, removeMetodoPagamento } from '../../store/actions/user'

class ConfiguracoesPagamento extends Component {

    state = {
        novoMetodo: {},
        valido: false,
        mode: 'listaMetodos'
    }

    onChangeCredit = (form) => {
        if(form.status.cvc==='valid' && form.status.expiry==='valid'){
            this.setState({ novoMetodo: { ...form.values }, valido: true})
        }
    }

    adicionaNovoMetodo = () => {
        if(this.state.valido){
            this.props.onAddMetodo(this.props.usuarioKey, this.state.novoMetodo)
            this.setState({ valido: false, mode: 'listaMetodos'})
        }
    }

    renderMetodos = () => {
        if(this.props.metodosPagamento.length>0){
            return(
                <View>
                    <FlatList
                            data={this.props.metodosPagamento}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={({ item, index }) => (                                    
                                    <Row style={{ minHeight: 80, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                                        <Card style={{ width: '100%' }}>
                                            <CardItem header style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{...styles.informacoesText, fontSize: 16}}>Tipo: Cartão</Text>
                                            </CardItem>
                                            <CardItem style={{alignItems: 'center', justifyContent: 'center'}}>
                                                
                                                    <Text style={styles.titulo}>Número: {" "+item.number}</Text>

                                            </CardItem>
                                            <CardItem footer style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={styles.informacoesText}>Vencimento: {" "+item.expiry}</Text>
                                            </CardItem>
                                        </Card>
                                    </Row>
                            )}
                        />
                </View>
            )
        }else{
            return(
                <View>
                    <Row style={{marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{...styles.informacoesText, textAlign: 'center'}}>Você ainda não tem nenhum método de pagamento cadastrado</Text>
                    </Row>
                </View>
            )
        }
    }

    renderMode = () => {
        switch(this.state.mode){
            case 'listaMetodos':{
                return(
                    <View>
                        <Row style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.tituloGrande}>Meus métodos de pagamento</Text>
                        </Row>
                        <Row style={{marginTop: 20}}>
                            <Col>
                            </Col>
                            <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                                <Button style={styles.button} onPress={() => this.setState({mode: 'adicionaMetodo'})}>
                                    <Text style={styles.buttonText}>
                                        Adicionar
                                    </Text>
                                </Button>
                            </Col>
                        </Row>
                        {this.renderMetodos()}
                        
                    </View>
                )
            }
            case 'adicionaMetodo':{
                return(
                    <View>
                        <Row style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.tituloGrande}>
                                Adicionar novo cartão
                            </Text>
                        </Row>
                        <Row style={{width: '100%', marginTop: 30}}>
                            <CreditCardInput onChange={this.onChangeCredit} />
                        </Row>
                        <Row style={{marginTop: 30, alignItems: 'center', justifyContent: 'center'}}>
                            <Button style={styles.button} onPress={() => this.adicionaNovoMetodo()}>
                                <Text style={styles.buttonText}>
                                    Adicionar
                                </Text>
                            </Button>
                        </Row>
                        <Row style={{marginTop: 30, alignItems: 'center', justifyContent: 'center'}}>
                            <Button bordered style={{borderColor: '#C20114', alignItems: 'center', justifyContent: 'center', borderRadius: 8}} onPress={() => this.setState({mode: 'listaMetodos'})}>
                                    <Text style={{...styles.buttonText, color: '#C20114'}}>Cancelar</Text>
                            </Button>
                        </Row>
                    </View>
                )
            }
            default: {
                return(
                    <View></View>
                )
            }
        }
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
                    <Grid style={{alignItems: 'center', justifyContent: 'center'}}>
                        {this.renderMode()}
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