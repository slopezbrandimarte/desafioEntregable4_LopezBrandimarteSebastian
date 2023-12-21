import {View,FlatList,StyleSheet} from "react-native"
import CardPedido from "./CardPedidos"


const ListaPedido = ({pedido,onModal}) => {
    return <View style={styles.listContainer}>
                <FlatList
                    data={pedido}
                    keyExtractor={item => item.id}
                    renderItem={({item})=>( <CardPedido item={item} onModal={onModal}/> )}
                />
            </View>
}
const styles = StyleSheet.create({
    listContainer : {

        width:"100%"
      }
})

export default ListaPedido