//PADRÃO
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Text } from 'native-base'
import { Dropdown } from 'react-native-material-dropdown';
//Components e utilitários internos
import Header from '../../components/HeaderComponent'
import commonStyle from '../../customization/commonStyles'
import FooterComponent from '../../components/FooterComponent';

const estados = [{ label: 'AC', value: 1 }, { label: 'AL', value: 2 }, { label: 'AP', value: 3 },
{ label: 'AM', value: 4 }, { label: 'BA', value: 5 }, { label: 'CE', value: 6 }, { label: 'DF', value: 7 },
{ label: 'ES', value: 8 }, { label: 'GO', value: 9 }, { label: 'MA', value: 10 },
{ label: 'MT', value: 11 }, { label: 'MS', value: 12 }, { label: 'MG', value: 13 }, { label: 'PA', value: 14 },
{ label: 'PB', value: 15 }, { label: 'PR', value: 16 }, { label: 'PE', value: 17 },
{ label: 'PI', value: 18 }, { label: 'RJ', value: 19 }, { label: 'RN', value: 20 }, { label: 'RS', value: 21 },
{ label: 'RO', value: 22 }, { label: 'RR', value: 23 }, { label: 'SC', value: 24 },
{ label: 'SP', value: 25 }, { label: 'SE', value: 26 }, { label: 'TO', value: 27 }]

class Home extends Component {
 
    render(){
        return(
            <Container style={styles.container}>
                <Header />
                <Content padder>
                        <Dropdown
                                containerStyle={{
                                    height: 40,
                                    width: '95%',
                                    borderColor: '#003266',
                                    borderWidth: 0.5,
                                    borderRadius: 4,
                                    justifyContent: 'center'
                                }}
                                data={estados}
                                itemTextStyle={{ ...styles.informacoesText, textAlign: 'center' }}
                                labelTextStyle={{ ...styles.informacoesText, textAlign: 'center' }}
                                style={{ fontFamily: 'Jura SemiBold', fontWeight: 'normal', textAlign: 'center' }}
                                onChangeText={this.onChangeText}
                                textColor='#003266'
                                inputContainerPadding={0}
                                dropdownOffset={{ top: 5, left: 0 }}
                                lineWidth={0}
                        />
                </Content>
                <FooterComponent />
            </Container>
        )
    }
    
}

const styles = StyleSheet.create({
    container: commonStyle.container
})

const mapStateToProps = ( { user, cidade }) => {
    return {        
        cidadesList: cidade.cidadesList,
        isLoadingCidades: cidade.isLoadingCidadesUf
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLogin: (user) => dispatch(login(user)),
        onRegistrar: (novoUser) => dispatch(registrar(novoUser)),
        onDismissError: () => dispatch(dismissErrorLogin()),
        onEsqueciSenha: (email) => dispatch(forgotPassword(email)),
        onDeslogar: () => dispatch(deslogar()) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)