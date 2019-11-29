//PADRÃO
import React, { Component } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { Container, Content, Text, Spinner, Button, Card, CardItem, Body } from 'native-base'
import { Row, Grid, Col } from 'react-native-easy-grid'
import { connect } from 'react-redux'
import { Dropdown } from 'react-native-material-dropdown';
import Dialog from "react-native-dialog"
//Components e utilitários internos
import Header from '../../../components/HeaderComponent'
import commonStyle from '../../../customization/commonStyles'
import FooterComponent from '../../../components/FooterComponent';
import { alteraListaCompras, setTotalCompra } from '../../../store/actions/mercado'

categorias = [{value: 1, label: 'Alimentos'}, {value: 2, label: 'Frutas'}, {value: 3, label: 'Produtos de Limpeza'}]

class DetalhesMercado extends Component {

    state = {
        mode: 'listaMercado',
        selectedValue: null,
        selectedLabel: null,
        dialog: false,
        mensagemDialog: '',
        tituloDialog: '',
        totalCompra: 0
    }

    onChangeText = (value, index) => {
        this.setState({ selectedValue: value, selectedLabel: categorias[index].label })
    }

    addListaCompras = (item) => {
        let listaTemp = Object.assign([], this.props.listaCompras)
        let total = this.state.totalCompra
        total = total + item.preco
        this.setState({totalCompra: total})
        listaTemp.push(item)
        this.props.onAlteraLista(listaTemp)
    }

    removeListaCompras = (index) => {
        let listaTemp = Object.assign([], this.props.listaCompras)
        listaTemp.splice(index, 1)
        this.props.onAlteraLista(listaTemp)
    }

    finalizaCompra = () => {
        if(this.props.enderecoCadastrado){
            if(this.props.cartaoCadastrado){
                this.props.onSetTotal(this.state.totalCompra)
                this.props.navigation.navigate('DetalhesCompra')
            }else{
                this.setState({dialog: true, mensagemDialog: 'Você deve cadastrar um método de pagamento antes de continuar!', tituloDialog: 'Atenção!'})
            }
        }else{
            this.setState({dialog: true, mensagemDialog: 'Você deve cadastrar um endereço de entrega antes de continuar!', tituloDialog: 'Atenção!'})
        }
    }

    renderCategorias = () => {
        switch(this.state.selectedValue){
            case 1: {
                return(
                    <View>
                        <FlatList
                            data={this.props.listaProdutos.alimentos.listaProdutos}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={({ item, index }) => (
                                
                                    <Row style={{ minHeight: 80, marginTop: 10 }}>
                                        <Card>
                                            <CardItem header>
                                            <Text>{item.nome}</Text>
                                            </CardItem>
                                            <CardItem>
                                                <Body>
                                                    <Text>
                                                    {item.preco}
                                                    </Text>
                                                </Body>
                                            </CardItem>
                                            <TouchableOpacity onPress={()=>this.addListaCompras(item)}>
                                                <CardItem footer>
                                                    <Text>Adicionar</Text>
                                                </CardItem>
                                            </TouchableOpacity>
                                        </Card>
                                    </Row>
                            )}
                        />
                    </View>
                )
            }
            case 2: {
                return(
                    <View>
                        <FlatList
                            data={this.props.listaProdutos.frutas.listaProdutos}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={({ item, index }) => (
                                
                                    <Row style={{ minHeight: 80, marginTop: 10 }}>
                                        <Card>
                                            <CardItem header>
                                            <Text>{item.nome}</Text>
                                            </CardItem>
                                            <CardItem>
                                                <Body>
                                                    <Text>
                                                    {item.preco}
                                                    </Text>
                                                </Body>
                                            </CardItem>
                                            <TouchableOpacity onPress={()=>this.addListaCompras(item)}>
                                                <CardItem footer>
                                                    <Text>Adicionar</Text>
                                                </CardItem>
                                            </TouchableOpacity>
                                        </Card>
                                    </Row>
                            )}
                        />
                    </View>
                )
            }
            case 3: {
                return(
                    <View>
                        <FlatList
                            data={this.props.listaProdutos.produtosLimpeza.listaProdutos}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={({ item, index }) => (
                                
                                    <Row style={{ minHeight: 80, marginTop: 10 }}>
                                        <Card>
                                            <CardItem header>
                                            <Text>{item.nome}</Text>
                                            </CardItem>
                                            <CardItem>
                                                <Body>
                                                    <Text>
                                                    {item.preco}
                                                    </Text>
                                                </Body>
                                            </CardItem>
                                            <TouchableOpacity onPress={()=>this.addListaCompras(item)}>
                                                <CardItem footer>
                                                    <Text>Adicionar</Text>
                                                </CardItem>
                                            </TouchableOpacity>
                                        </Card>
                                    </Row>
                            )}
                        />
                    </View>
                )
            }
            default: {
                return (
                    <View>

                    </View>
                )
            }
        }
    }

    renderDadosCarrinho = () => {
        if(this.props.listaCompras.length>0){
            return(
                <View>
                     <FlatList
                            data={this.props.listaCompras}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={({ item, index }) => (
                                
                                    <Row style={{ minHeight: 80, marginTop: 10 }}>
                                        <Card>
                                            <CardItem header>
                                            <Text>{item.nome}</Text>
                                            </CardItem>
                                            <CardItem>
                                                <Body>
                                                    <Text>
                                                    {item.preco}
                                                    </Text>
                                                </Body>
                                            </CardItem>
                                            <TouchableOpacity onPress={()=>this.removeListaCompras(index)}>
                                                <CardItem footer>
                                                    <Text>Remover</Text>
                                                </CardItem>
                                            </TouchableOpacity>
                                        </Card>
                                    </Row>
                            )}
                        />
                        <Row>
                            <Text>Total: R${" "+this.state.totalCompra}</Text>
                        </Row>
                        <Row style={{marginTop: 30}}>
                            <Button onPress={() => {this.finalizaCompra()}}>
                                <Text>Comprar</Text>
                            </Button>
                        </Row>
                </View>
            )
        }else{
            return(
                <View>
                    <Row>
                        <Text>Ainda não há nada no seu carrinho.</Text>
                    </Row>
                </View>
            )
        }
    }

    renderMode = () => {
        switch(this.state.mode){
            case 'listaMercado': {
                return(
                    <View>
                        <Row>
                            <Button onPress={() => {this.setState({mode: 'listaCompras'})}}>
                                <Text>Carrinho</Text>
                            </Button>
                        </Row>
                        <Row>
                            <Text>Categoria</Text>
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
                                    data={categorias}
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
                        {this.renderCategorias()}
                    </View>
                )
            }
            case 'listaCompras': {
                return (
                    <View>
                        <Row>
                            <Button onPress={() => {this.setState({mode: 'listaMercado'})}}>
                                <Text>Produtos</Text>
                            </Button>
                        </Row>
                        <Row>
                            <Text>Meu Carrinho</Text>
                        </Row>
                        {this.renderDadosCarrinho()}
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
                    <Grid>
                        <Row>
                            <Text>{this.props.nomeMercado}</Text>
                        </Row>
                        <Row>
                            <Text>
                                Classificacao: {this.props.classificacao}
                            </Text>
                        </Row>
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


const mapStateToProps = ( { mercado, user }) => {
    return {        
        nomeMercado: mercado.nome,
        classificacao: mercado.classificacao,
        listaProdutos: mercado.listaProdutos,
        listaCompras: mercado.listaCompras,
        isLoading: mercado.isLoading,
        enderecoCadastrado: user.localEntregaCadastrado,
        cartaoCadastrado: user.cartaoCadastrado
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAlteraLista: (novaLista) => dispatch(alteraListaCompras(novaLista)),
        onSetTotal: (total) => dispatch(setTotalCompra(total))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalhesMercado)