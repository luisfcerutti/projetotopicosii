//PADRÃO
import React, { Component } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { Container, Content, Text, Spinner, Card, CardItem, Body, Badge } from 'native-base'
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
        if (this.props.isLoadingCidade) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Spinner color='#C20114' />
                </View>
            )
        } else {
            return (
                <View>
                    <Grid>
                        <Row style={{ marginTop: 20, marginBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.titulo}>Mercados em {this.props.cidadeSelecionada + "/" + this.props.ufSelecionado}</Text>
                        </Row>
                        <FlatList
                            data={this.props.listaMercados}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => this.buscaDetalheMercado(item.key)}>
                                    <Row style={{ minHeight: 80, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                                        <Card style={{ width: '80%' }}>
                                            <CardItem header style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{...styles.informacoesText, fontSize: 16}}>{item.nome}</Text>
                                            </CardItem>
                                            <CardItem style={{alignItems: 'center', justifyContent: 'center'}}>
                                                
                                                    <Text style={styles.informacoesText}>
                                                        Nota {" "}
                                                    </Text>
                                                    <Badge>
                                                        <Text>{item.classificacao}</Text>
                                                    </Badge>

                                            </CardItem>
                                            <CardItem footer style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={styles.informacoesText}>Visualizar</Text>
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

    render() {
        return (
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
    buttonText: commonStyle.buttonTextNormal
})

const mapStateToProps = ({ cidade }) => {
    return {
        listaMercados: cidade.listaMercados,
        isLoadingCidade: cidade.isLoadingCidade,
        cidadeSelecionada: cidade.cidadeSelecionada,
        ufSelecionado: cidade.ufSelecionado
    }
}

const mapDispatchToProps = dispatch => {
    return {
        buscaMercado: (mercadoKey) => dispatch(fetchDadosMercado(mercadoKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListaMercados)