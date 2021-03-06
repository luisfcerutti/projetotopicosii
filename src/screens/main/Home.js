//PADRÃO
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Content, Text, Spinner, Button } from 'native-base'
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux'
import { Row, Grid, Col } from 'react-native-easy-grid'
import Dialog from "react-native-dialog"
//Components e utilitários internos
import Header from '../../components/HeaderComponent'
import commonStyle from '../../customization/commonStyles'
import FooterComponent from '../../components/FooterComponent';
import { fetchCidadesUf, fetchMercadosCidade } from '../../store/actions/cidade';

const estados = [{ label: 'AC', value: 1 }, { label: 'AL', value: 2 }, { label: 'AP', value: 3 },
{ label: 'AM', value: 4 }, { label: 'BA', value: 5 }, { label: 'CE', value: 6 }, { label: 'DF', value: 7 },
{ label: 'ES', value: 8 }, { label: 'GO', value: 9 }, { label: 'MA', value: 10 },
{ label: 'MT', value: 11 }, { label: 'MS', value: 12 }, { label: 'MG', value: 13 }, { label: 'PA', value: 14 },
{ label: 'PB', value: 15 }, { label: 'PR', value: 16 }, { label: 'PE', value: 17 },
{ label: 'PI', value: 18 }, { label: 'RJ', value: 19 }, { label: 'RN', value: 20 }, { label: 'RS', value: 21 },
{ label: 'RO', value: 22 }, { label: 'RR', value: 23 }, { label: 'SC', value: 24 },
{ label: 'SP', value: 25 }, { label: 'SE', value: 26 }, { label: 'TO', value: 27 }]

class Home extends Component {

    state = {
        pesquisaRealizada: false,
        selectedLabel: null,
        selectedValue: null,
        selectedLabelCidade: null,
        selectedValueCidade: null,
        dialog: false,
        mensagemDialog: '',
        tituloDialog: ''
    }

    onChangeText = (value, index) => {
        this.setState({ selectedValue: value, selectedLabel: estados[index].label })
        if(this.state.selectedLabel!==null){
            this.props.onPesquisaCidadesUf(this.state.selectedLabel)
            this.setState({pesquisaRealizada: true})
        }
    }

    onChangeText2 = (value, index) => {
        this.setState({ selectedValueCidade: value, selectedLabelCidade: this.props.cidadesList[index].label })
    }   

    pesquisaMercadosCidade = () => {
        if(this.state.selectedLabelCidade!==null){
            this.props.onSelecionaCidade(this.state.selectedLabel, this.state.selectedLabelCidade)
            this.props.navigation.navigate('ListaMercados')
        }else{
            this.setState({dialog: true, mensagemDialog: 'A cidade deve ser selecionada!', tituloDialog: 'Atenção!'})
        }
    }

    pesquisaOuNao = () => {
        if(this.props.isLoadingCidades){
            return(
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Spinner color='#C20114' />
                </View>
            )
        }else{
            if(this.state.pesquisaRealizada){
                if(this.props.cidadesList.length>0){
                    return(
                        <View>
                            <Row style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                                <Text style={styles.informacoesText}>
                                    Selecione a cidade:
                                </Text>
                            </Row>
                            <Row style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                                <Dropdown
                                    containerStyle={{
                                        height: 40,
                                        width: '95%',
                                        borderColor: '#C20114',
                                        borderWidth: 0.5,
                                        borderRadius: 4,
                                        justifyContent: 'center'
                                    }}
                                    data={this.props.cidadesList}
                                    itemTextStyle={{ ...styles.informacoesText, textAlign: 'center' }}
                                    labelTextStyle={{ ...styles.informacoesText, textAlign: 'center' }}
                                    style={{ fontFamily: 'Montserrat Medium', fontWeight: 'normal', textAlign: 'center' }}
                                    onChangeText={this.onChangeText2}
                                    textColor='#C20114'
                                    inputContainerPadding={0}
                                    dropdownOffset={{ top: 5, left: 0 }}
                                    lineWidth={0}
                                />
                            </Row>
                            <Row style={{marginTop: 20}}>
                                <Col size={2}>

                                </Col>
                                <Col size={2}>                                
                                    <Button style={styles.button} onPress={() => this.pesquisaMercadosCidade()}>
                                        <Text style={styles.buttonText}>Pesquisar</Text>
                                    </Button>
                                </Col>
                            </Row>
                        </View>
                    )
                }else{
                    return(
                        <View>
                            <Row style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>                            
                                <Text style={styles.informacoesText}>Não há nenhuma cidade cadastrada nesse estado!</Text>
                            </Row>
                        </View>
                    )
                }
            }else{
                return(
                    <View>
                        <Row style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                            <Text style={styles.informacoesText}>Selecione acima o estado que deseja buscar.</Text>
                        </Row>
                    </View>
                )
            }
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
                        <Row style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                            <Text style={styles.titulo}>Busca por cidade</Text>
                        </Row>
                        <Row style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                            <Text style={styles.informacoesText}>Selecione o estado</Text>
                        </Row>
                        <Row style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                            <Dropdown
                                    containerStyle={{
                                        height: 40,
                                        width: '95%',
                                        borderColor: '#C20114',
                                        borderWidth: 0.5,
                                        borderRadius: 4,
                                        justifyContent: 'center'
                                    }}
                                    data={estados}
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
                        {this.pesquisaOuNao()}
                    </Grid>
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

const mapStateToProps = ( { cidade }) => {
    return {        
        cidadesList: cidade.cidadesList,
        isLoadingCidades: cidade.isLoadingCidadesUf
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onPesquisaCidadesUf: (uf) => dispatch(fetchCidadesUf(uf)),
        onSelecionaCidade: (uf, cidade) => dispatch(fetchMercadosCidade(uf, cidade))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)