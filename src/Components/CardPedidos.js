import {View , Text , StyleSheet, TouchableOpacity } from "react-native"
import {useFonts} from 'expo-font'
import {CheckBox} from 'react-native-elements'


const CardPedidos = ({item,onCheckBoxToggle}) => {
    const [fontsLoaded] = useFonts({
        Lato: require('../../assets/Fonts/Lato-Bold.ttf')
      })
    
      if(!fontsLoaded)return null

    const renderCondicional = (label, value) => {
        return value ? (
            <View  style={styles.condicionalContainer}>
                <Text style={styles.titulo}>{label}</Text>
                <Text style={styles.contenido}>{value}</Text>
            </View>
        ) : null

    }
    

    return <View style={styles.cardPedido} >
                {renderCondicional('Categoria: ', item.categoria)}
                {renderCondicional('Exportador/Importador: ', item.exportador)}
                {renderCondicional('Accion: ', item.accion)}
                {renderCondicional('Identificacion: ', item.identificacion)}
                {renderCondicional('Buque', item.buque)}
                {renderCondicional('Vencimiento: ', item.vencimiento)}
                {renderCondicional('fecha solicitado: ', item.fechaSolicitado)}
                
                <CheckBox
                title="Finalizado"
                checked={item.completado}
                onPress={()=>onCheckBoxToggle(item.id)}
                style={styles.checkBox}/>
                

              
            </View> 
}
const styles = StyleSheet.create({
    cardPedido:{
  
        flexDirection:"column",
        padding:10,
        margin:3,
        justifyContent:"space-around",
        alignItems:"center",
        borderWidth:1,
        borderRadius:10,
        
    },
    condicionalContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        
    },
    titulo:{
        
        fontWeight:"bold",
        marginRight:5,
        fontFamily: 'Lato'
    },
    contenido:{
        
        flex:1,
        fontFamily: 'Lato'
    },
    checkBox:{
        backgroundColor: '#5937DB',

    }
    
})
export default CardPedidos