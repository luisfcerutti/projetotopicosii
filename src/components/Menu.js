import React from 'react'
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { DrawerItems } from 'react-navigation'

export default props => {
    
    const desconectar = () =>{
        props.navigation.navigate('Auth')
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'ghostwhite'}}>
            <View style={{ height: 170, backgroundColor: 'ghostwhite', alignItems:'center', justifyContent:'center', marginBottom: 10, marginTop: 10}}>
                <Text style={{fontFamily: 'Montserrat Bold', fontWeight: 'normal', fontSize: 40, color: '#C20114'}}>iMarket</Text>
            </View>
            <ScrollView>
                <DrawerItems {...props}/>                
                    <TouchableOpacity onPress={desconectar} style={{marginTop: 8, marginBottom: 8, alignItems: 'center', backgroundColor: '#E9B2B2', padding: 15}}>
                        <Text
                            style={{fontSize: 23,
                            fontFamily: 'Montserrat Semibold',
                            fontWeight: 'normal',
                            color: '#C20114'}}>
                            Sair
                        </Text>
                    </TouchableOpacity>                   
            </ScrollView>
        </SafeAreaView>
    )

}