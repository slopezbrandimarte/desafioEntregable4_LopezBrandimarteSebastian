import { StyleSheet,  View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import colores from '../Global/colores'




const Header = () => {
  
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containermenor} onPress={() => navigation.navigate('categorias')} >
        <Image
          style={styles.image}
          resizeMode='cover'
          source={require('../../assets/logo.png')}
        />
      </TouchableOpacity>
      
    
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        backgroundColor:colores.cuatro,
        width: "100%",
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10,
        flexDirection: 'row',
      },
      titulo: {
        fontSize: 30,
        color: colores.letras,
        fontWeight: 'bold',
        fontFamily: 'Lato'
      },
      image:{
        width: 90 ,
        height: 60,
        marginTop: 10,
        
      }
    
})