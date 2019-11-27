//Padrão
import React, { Component } from 'react'
import { createDrawerNavigator, createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome5'
//Screens
import Home from './screens/main/Home'
import Login from './screens/main/Login'
import MinhaConta from './screens/main/MinhaConta'
//Child Screens
import ListaMercados from './screens/child/Home/ListaMercados'
import DetalhesMercado from './screens/child/Mercado/DetalhesMercado'
import DetalhesCompra from './screens/child/Mercado/DetalhesCompra'
import ListaProdutosMercado from './screens/child/Mercado/ListaProdutosMercado'
import FinalizaCompra from './screens/child/Mercado/FinalizaCompra'
//Component
import Menu from './components/Menu'
import ConfiguracoesPagamento from './screens/main/ConfiguracoesPagamento'

//Navigator Pages

const mercadoStack = createStackNavigator({
    ListaMercados: ListaMercados,
    DetalhesMercado: DetalhesMercado,
    DetalhesCompra: DetalhesCompra,
    ListaProdutosMercado: ListaProdutosMercado,
    FinalizaCompra: FinalizaCompra
}, {
    initialRouteName: 'ListaMercados',
    headerMode: 'none'
})

const homeStack = createStackNavigator({
    Home: Home,
    ListaMercados: mercadoStack
}, {
    initialRouteName: 'Home',
    headerMode: 'none'
})

// Class Hidden

class Hidden extends Component {
    render() {
        return null;
    }
}

//Config Menu

const MenuRoutes = {
    Home:{
        name:'Home',
        screen: homeStack,
        navigationOptions: {
            title: 'Início',
            drawerIcon: () => (
                <Icon name="home" size={20} color={'#003266'} />
            )          
        }
    },
    MinhaConta:{
        name:'MinhaConta',
        screen: MinhaConta,
        navigationOptions: {
            title: 'Minha Conta',
            drawerIcon: () => (
                <Icon name="cogs" size={20} color={'#003266'} />
            )          
        }
    },
    ConfiguracoesPagamento:{
        name:'ConfiguracoesPagamento',
        screen: ConfiguracoesPagamento,
        navigationOptions: {
            title: 'Configuração Pagamento',
            drawerIcon: () => (
                <Icon name="cogs" size={20} color={'#003266'} />
            )          
        }
    }
}

const MenuConfig = {
    initialRouteName: 'Home',
    contentComponent: Menu,
    contentOptions:{
        labelStyle:{
            fontSize: 21,
            fontFamily: 'Jura Bold',
            fontWeight: 'normal',
            color: '#003266'
        },
        activeLabelStyle:{
            color:'#003266',
            fontSize: 22
        },
        activeBackgroundColor: '#DFE2E5'
    }
}

const MenuNavigator = createDrawerNavigator(MenuRoutes, MenuConfig)

const authSwitch = createSwitchNavigator({
    Acesso: MenuNavigator,
    Auth: Login
}, {
    initialRouteName: 'Auth'
})

const AppContainer = createAppContainer(authSwitch)

export default AppContainer