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
                                    <Row style={{ minHeight: 80, marginTop: 10 }}>
                                        <Card style={{width: '80%'}}>
                                            <CardItem header>
                                                <Text>{item.type}</Text>
                                            </CardItem>
                                            <CardItem>
                                                <Body>
                                                    <Text>
                                                    {item.number}
                                                    </Text>
                                                </Body>
                                            </CardItem>
                                            <CardItem footer>
                                                <Text>{item.expiry}</Text>
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
                    <Row>
                        <Text>Você ainda não tem nenhum método de pagamento cadastrado</Text>
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
                        <Row>
                            <Text>Meus métodos de pagamento</Text>
                        </Row>
                        {this.renderMetodos()}
                        <Row>
                            <Button onPress={() => this.setState({mode: 'adicionaMetodo'})}>
                                <Text>
                                    Adicionar
                                </Text>
                            </Button>
                        </Row>
                    </View>
                )
            }
            case 'adicionaMetodo':{
                return(
                    <View>
                        <Row>
                            <Text>
                                Adicionar novo cartão
                            </Text>
                        </Row>
                        <Row style={{width: '100%'}}>
                            <CreditCardInput onChange={this.onChangeCredit} />
                        </Row>
                        <Row style={{marginTop: 30}}>
                            <Button onPress={() => this.adicionaNovoMetodo()}>
                                <Text>
                                    Adicionar
                                </Text>
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
                    <Grid>
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