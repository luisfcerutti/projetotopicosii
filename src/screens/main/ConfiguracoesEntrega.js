//PADRÃO
import React, { Component } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { Container, Content, Text, Spinner, Button, Item, Icon, Input, Card, CardItem, Body } from 'native-base'
import { Row, Grid, Col } from 'react-native-easy-grid'
import { connect } from 'react-redux'
//Components e utilitários internos
import Header from '../../components/HeaderComponent'
import commonStyle from '../../customization/commonStyles'
import FooterComponent from '../../components/FooterComponent'
import { fetchEntregas, alteraLocalEntrega } from '../../store/actions/user'

class ConfiguracoesEntrega extends Component {

    state = {
        mode: 'configuraEndereco',
        localEntrega: {
            rua: '',
            complemento: '',
            numero: '',
            bairro: ''
        }
    }

    alteraEntrega = () => {
        this.props.onAlteraEntrega(this.state.localEntrega, this.props.usuarioKey)
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.isLoadingEntregas && !this.props.isLoadingEntregas){
            this.setState({ localEntrega: { ...this.props.configuracaoEntrega }})
        }
    }

    componentDidMount(){
        this.setState({ localEntrega: { ...this.props.configuracaoEntrega }})
    }

    renderEncomendas = () => {
        if(this.props.entregas.length>0){
            return(
                <View>
                    <FlatList
                            data={this.props.entregas}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={({ item, index }) => (
                                    <Row style={{ minHeight: 80, marginTop: 10 }}>
                                        <Card>
                                            <CardItem header>
                                                <Text>{item.data}</Text>
                                            </CardItem>
                                            <CardItem>
                                                <Body>
                                                    <Text>
                                                    {item.mercado}
                                                    </Text>
                                                </Body>
                                            </CardItem>
                                            <CardItem footer>
                                                <Text>{item.valor}</Text>
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
                    <Text>Você ainda não solicitou nenhuma entrega.</Text>
                </View>
            )
        }
    }

    renderMode = () => {
        switch(this.state.mode){
            case 'configuraEndereco': {
                return(
                    <View>
                        <Row>
                            <Col>
                                <Text>                                
                                    Endereço de Entrega
                                </Text>
                            </Col>
                            <Col>
                                <Button onPress={() => this.setState({mode: 'minhasEncomendas'})}>
                                    <Text>Minhas Encomendas</Text>
                                </Button>
                            </Col>
                        </Row>                        
                        <Row>
                            <Item style={{width: '100%'}}>
                                <Icon name="md-at"/>
                                <Input 
                                value={this.state.localEntrega.rua}
                                placeholder={this.state.localEntrega.rua.length>0 ? this.state.localEntrega.rua : 'Rua'} 
                                onChangeText={(text) => this.setState({localEntrega: { ...this.state.localEntrega, rua: text}})}/>
                            </Item>
                        </Row>
                        <Row>
                            <Item style={{width: '100%'}}>
                                <Icon name="md-key"/>
                                <Input 
                                value={this.state.localEntrega.numero}
                                placeholder={this.state.localEntrega.numero.length>0 ? this.state.localEntrega.numero : 'Número'} 
                                onChangeText={(text) => this.setState({localEntrega: { ...this.state.localEntrega, numero: text}})}/>
                            </Item>
                        </Row>
                        <Row>
                            <Item style={{width: '100%'}}>
                                <Icon name="md-key"/>
                                <Input
                                value={this.state.localEntrega.complemento} 
                                placeholder={this.state.localEntrega.complemento.length>0 ? this.state.localEntrega.complemento : 'Complemento'} 
                                onChangeText={(text) => this.setState({localEntrega: { ...this.state.localEntrega, complemento: text}})}/>
                            </Item>
                        </Row>
                        <Row>
                            <Item style={{width: '100%'}}>
                                <Icon name="md-key"/>
                                <Input
                                value={this.state.localEntrega.bairro} 
                                placeholder={this.state.localEntrega.bairro.length>0 ? this.state.localEntrega.bairro : 'Bairro'} 
                                onChangeText={(text) => this.setState({localEntrega: { ...this.state.localEntrega, bairro: text}})}/>
                            </Item>
                        </Row>
                        <Row>
                            <Button onPress={() => this.alteraEntrega()}>
                                <Text>Alterar</Text>
                            </Button>
                        </Row>
                    </View>
                )
            }
            case 'minhasEncomendas': {
                return (
                    <View>
                        <Row>
                            <Col>
                                <Text>                                
                                    Minhas Encomendas
                                </Text>
                            </Col>
                            <Col>
                                <Button onPress={() => this.setState({mode: 'configuraEndereco'})}>
                                    <Text>Endereço de Entrega</Text>
                                </Button>
                            </Col>
                        </Row>
                        {this.renderEncomendas()}
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
        if(this.props.isLoadingEntregas){
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
    informacoesText: commonStyle.informacoesText
})


const mapStateToProps = ( { user }) => {
    return {        
        usuarioKey: user.key,
        configuracaoEntrega: user.configuracaoEntrega,
        entregas: user.minhasEntregas,
        isLoadingEntregas: user.isLoadingEntregas
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchEntregas: (userKey) => dispatch(fetchEntregas(userKey)),
        onAlteraEntrega: (novoLocal, userKey) => dispatch(alteraLocalEntrega(novoLocal, userKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfiguracoesEntrega)