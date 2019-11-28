//PADRÃO
import React, { Component } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { Container, Content, Text, Spinner, Card, CardItem, Body } from 'native-base'
import { Row, Grid, Col } from 'react-native-easy-grid'
import { connect } from 'react-redux'
//Components e utilitários internos
import Header from '../../../components/HeaderComponent'
import commonStyle from '../../../customization/commonStyles'
import FooterComponent from '../../../components/FooterComponent';
import { fetchDadosMercado } from '../../../store/actions/mercado'

class ListaMercados extends Component {


    buscaDetalheMercado = (mercadoKey) => {
        this.props.buscaMercado(mercadoKey)
        this.props.navigation.navigate('DetalhesMercado')
    }

    loadingOuNao = () => {
        if(this.props.isLoadingCidade){
            return(
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Spinner color='#C20114' />
                </View>
            )
        }else{
            return(
                <View>
                    <Grid>
                        <Row style={{marginBottom: 25}}>
                            <Text style={styles.titulo}>Mercados em {this.props.cidadeSelecionada+"/"+this.props.ufSelecionado}</Text>
                        </Row>
                        <FlatList
                            data={this.props.listaMercados}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={()=>this.buscaDetalheMercado(item.key)}>
                                    <Row style={{ minHeight: 80, marginTop: 10 }}>
                                        <Card>
                                            <CardItem header>
                                            <Text>{item.nome}</Text>
                                            </CardItem>
                                            <CardItem>
                                                <Body>
                                                    <Text>
                                                    //Your text here
                                                    </Text>
                                                </Body>
                                            </CardItem>
                                            <CardItem footer>
                                                <Text>Visualizar</Text>
                                            </CardItem>
                                        </Card>
                                    </Row>
                                </TouchableOpacity>
                            )}
                        />
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
    titulo: commonStyle.tituloText
})

const mapStateToProps = ( { cidade }) => {
    return {        
        listaMercados: cidade.listaMercados,
        isLoadingCidade: cidade.isLoadingCidade,
        cidadeSelecionada: cidade.cidadeSelecionada,
        ufSelecionado: cidade.ufSelecionado
    }
}

const mapDispatchToProps = dispatch => {
    return{
        buscaMercado: (mercadoKey) => dispatch(fetchDadosMercado(mercadoKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListaMercados)