import React, {Component} from 'react'
import { StyleSheet } from 'react-native'
import { Footer, FooterTab, Text } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5'
import commonStyle from '../customization/commonStyles'

class FooterComponent extends Component {
    render(){
        return (            
            <Footer style={styles.footer}>
                <FooterTab style={styles.footerTab}>
                    <Text>iMarket {" "}                    
                    <Icon name="copyright" size={14} color="#C20114"/></Text>
                </FooterTab>
            </Footer>
        )
    }    

}

const styles = StyleSheet.create({
    footer: commonStyle.footer,
    footerTab: commonStyle.footerTab
})

export default FooterComponent