//PADRÃO
import React, { Component } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { Container, Content, Text, Spinner, Button, Card, CardItem, Body, Badge, Icon } from 'native-base'
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
                                
                                <Row style={{ minHeight: 30, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <Card style={{ width: '80%' }}>
                                        <CardItem header style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{...styles.informacoesText, fontSize: 16}}>{item.nome}{"  "}</Text>
                                            <Badge>
                                                    <Text style={{...styles.informacoesText, color: '#FFFFFF'}}>{"R$ "}{item.preco}</Text>
                                            </Badge>
                                        </CardItem>
                                        <TouchableOpacity onPress={()=>this.addListaCompras(item)}>
                                            <CardItem footer style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={styles.informacoesText}>Adicionar</Text>
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
                                    
                                        <Row style={{ minHeight: 30, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                                            <Card style={{ width: '80%' }}>
                                                <CardItem header style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{...styles.informacoesText, fontSize: 16}}>{item.nome}{"  "}</Text>
                                                    <Badge>
                                                            <Text style={{...styles.informacoesText, color: '#FFFFFF'}}>{"R$ "}{item.preco}</Text>
                                                    </Badge>
                                                </CardItem>
                                                <TouchableOpacity onPress={()=>this.addListaCompras(item)}>
                                                    <CardItem footer style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={styles.informacoesText}>Adicionar</Text>
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
                                
                                <Row style={{ minHeight: 30, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <Card style={{ width: '80%' }}>
                                        <CardItem header style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{...styles.informacoesText, fontSize: 16}}>{item.nome}{"  "}</Text>
                                            <Badge>
                                                    <Text style={{...styles.informacoesText, color: '#FFFFFF'}}>{"R$ "}{item.preco}</Text>
                                            </Badge>
                                        </CardItem>
                                        <TouchableOpacity onPress={()=>this.addListaCompras(item)}>
                                            <CardItem footer style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={styles.informacoesText}>Adicionar</Text>
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
                    <Row style={{marginTop: 30}}>
                        <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={styles.informacoesText}>Total: R${" "+this.state.totalCompra}</Text>
                        </Col>
                        <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Button style={styles.button} onPress={() => {this.finalizaCompra()}}>
                                <Icon name='ios-card' />
                                <Text style={styles.buttonText}>Comprar</Text>
                            </Button>
                        </Col>
                    </Row>
                     <FlatList
                            data={this.props.listaCompras}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={({ item, index }) => (
                                
                                <Row style={{ minHeight: 30, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <Card style={{ width: '80%' }}>
                                        <CardItem header style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{...styles.informacoesText, fontSize: 16}}>{item.nome}{"  "}</Text>
                                            <Badge>
                                                    <Text style={{...styles.informacoesText, color: '#FFFFFF'}}>{"R$ "}{item.preco}</Text>
                                            </Badge>
                                        </CardItem>
                                        <TouchableOpacity onPress={()=>this.removeListaCompras(index)}>
                                            <CardItem footer style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={styles.informacoesText}>Remover</Text>
                                            </CardItem>
                                        </TouchableOpacity>
                                    </Card>
                                </Row>
                            )}
                        />
                        
                </View>
            )
        }else{
            return(
                <View>
                    <Row style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                        <Text style={styles.informacoesText}>Ainda não há nada no seu carrinho.</Text>
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
                        <Row style={{marginTop: 20}}>
                            <Col style={{alignItems: 'center', justifyContent: 'center'}} size={2}>
                                <Text style={styles.informacoesText}>
                                    Nota
                                </Text>
                                <Badge style={{alignSelf: 'center'}}>
                                    <Text>{this.props.classificacao}</Text>
                                </Badge>
                            </Col>
                            <Col size={2} style={{justifyContent: 'center', alignItems: 'center'}}>                                
                                <Button style={styles.button} onPress={() => {this.setState({mode: 'listaCompras'})}}>
                                    <Icon name='ios-cart' />
                                    <Text style={styles.buttonText}>Carrinho</Text>
                                </Button>
                            </Col>
                        </Row>
                        <Row style={{marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={styles.informacoesText}>Categoria</Text>
                        </Row>
                        <Row style={{marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
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
                        <Row style={{marginTop: 20}}>
                            <Col style={{alignItems: 'center', justifyContent: 'center'}} size={2}>
                                <Text style={styles.informacoesText}>
                                    Nota
                                </Text>
                                <Badge style={{alignSelf: 'center'}}>
                                    <Text>{this.props.classificacao}</Text>
                                </Badge>
                            </Col>
                            <Col size={2} style={{justifyContent: 'center', alignItems: 'center'}}>                                
                                <Button style={styles.button} onPress={() => {this.setState({mode: 'listaMercado'})}}>
                                    <Icon name='ios-list-box' />
                                    <Text style={styles.buttonText}>Produtos</Text>
                                </Button>
                            </Col>
                        </Row>
                        <Row style={{marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.titulo}>Meu Carrinho</Text>
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
                        <Row style={{marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={styles.tituloGrande}>{this.props.nomeMercado}</Text>
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
    container: commonStyle.container,
    informacoesText: commonStyle.informacoesText,
    buttonTextGrande: commonStyle.buttonTextGrande,
    button: commonStyle.button,
    titulo: commonStyle.tituloText,
    buttonText: commonStyle.buttonTextNormal,
    tituloGrande: commonStyle.superTituloText
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