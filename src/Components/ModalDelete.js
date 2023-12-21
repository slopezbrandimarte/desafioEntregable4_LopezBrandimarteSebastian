import {Modal,View,Text, StyleSheet, TouchableOpacity} from "react-native"

const ModalDelete = ({visible,onModal,onDelete}) =>{

    return  <Modal visible={visible} transparent animationType="slide">
              <View style={styles.modalContainerMayor}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Desea eliminar el pedido?</Text>
                        
                        <TouchableOpacity style={styles.contenedorBoton} >
                          <Text style={styles.botonAceptar} title="Aceptar" onPress={onDelete}>Aceptar</Text>
                          <Text style={styles.botonCancelar} title="Cancelar" onPress={()=> onModal(false)}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>        
                </View>
              </View>  
            </Modal>
}
const styles = StyleSheet.create({
  modalContainerMayor:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"rgba(0,0,0,0.4)"

  },
    modalContainer:{
      width: "80%",
      backgroundColor: "#fff", // Fondo blanco del modal
      borderRadius: 10,
      padding: 20,
      alignItems: "center",
      elevation: 5, // Sombras para Android
      shadowColor: "#000", // Sombras para iOS
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      },
      modalContent:{
        width:"80%",
        borderWidth:0.5,
        padding:20,
        alignItems:"center",
        gap:10,
        borderRadius:10
      },
      modalText:{
        textAlign:"center",
        marginBottom:20
      },
      contenedorBoton:{
        flexDirection:"row",
        justifyContent:"space-around",
        width:"100%"
      },
      botonAceptar:{
        marginTop:10,
        backgroundColor:"#1CDB64",
        
      }, 
      botonCancelar:{
        marginTop:10,
        backgroundColor:"#FF4D4D",
        
      }

})
export default ModalDelete