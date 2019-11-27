import React, {Component} from 'react'
import { StyleSheet } from 'react-native'
import { Header, Left, Body, Right, Icon, Button } from 'native-base'
//import Icon from 'react-native-vector-icons/FontAwesome5'
import { withNavigation, DrawerActions } from 'react-navigation'

class HeaderComponent extends Component {
    render(){
        return ( 
            <Header style={styles.header} iosBarStyle="light-content" androidStatusBarColor="#000000">
                <Left>
                    <Button transparent onPress={(props) => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                        <Icon ios='ios-menu' android="md-menu" style={{fontSize: 33, color: '#003266'}}/>
                    </Button>
                </Left>
                <Body></Body>
                <Right>
                    <Text>iMarket</Text>
                </Right>              
            </Header>
        )
    }    

}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fdfdff', 
        height: 63
    }
})

export default withNavigation(HeaderComponent)