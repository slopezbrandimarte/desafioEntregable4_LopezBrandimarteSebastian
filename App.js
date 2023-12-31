
import {  Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from './src/Components/Header';
import colores from './src/Global/colores';
import FormPedidos from './src/Components/FormPedidos';
import { useState } from 'react';
import uuid from 'react-native-uuid'
import ModalDelete from './src/Components/ModalDelete';
import ListaPedido from './src/Components/ListaPedidos';
import {useFonts} from 'expo-font'



const App=()=> {
  const [newPedido, setNewPedido] = useState(initialPedidoState)
  const [pedido, setPedido] = useState([])
  const [pedidoSelect, setPedidoSelect] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [verOpciones, setVerOpciones] = useState('all')


  const [fontsLoaded] = useFonts({
    Lato: require('./assets/Fonts/Lato-Bold.ttf')
  })

  if(!fontsLoaded)return null

  const initialPedidoState = {
    id: uuid.v4(),
    categoria: '',
    exportador: '',
    accion: '',
    identificacion: '',
    buque: '',
    vencimiento: '',
    completado: false,
  }
  const handleCheckBoxToggle = (pedidoId) => {
    setPedido((current) =>
      current.map((item) =>
        item.id === pedidoId ? { ...item, completado: !item.completado } : item
      )
    )
  }
  const pedidosEnCurso = pedido.filter((item) =>!item.completado)
  const pedidosFinalizados = pedido.filter((item) =>item.completado)


  const handleInputChange = (field,value) =>{
    
    setNewPedido((current) => ({...current, [field]: value}))
  } 

  const handleAddPedido = () => {
    const date = new Date()
    
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, 
      timeZone: 'America/Buenos_Aires',
};

    const selectedCategoria = newPedido.categoria
    const fechaSolicitado =date.toLocaleString('es-AR', options)
    const newPedidoConFecha = {
      ...newPedido,
      categoria: selectedCategoria,
      fechaSolicitado,
    }
    
    
    setPedido(current => [...current, newPedidoConFecha])
    setNewPedido(initialPedidoState)
    setModalVisible(false)
    
    
  }
  const handleModal = (item) => {
    setPedidoSelect(item)
    setDeleteModalVisible(true)
  }

  const handleDelete = () => {
    setPedido(current =>
      current.filter((item) => item.id !== pedidoSelect.id))
    setDeleteModalVisible(false)
  }
 
  
  }
  return (
    <View style={styles.container}>
      <Header style={styles.header}/>
      <View style={styles.botonAgregarContainer}>
        <TouchableOpacity
          style={styles.botonAgregar} 
          onPress={()=> setModalVisible(true)}
        >
          <Text style={styles.botonAgregarText}>Agregar Pedido</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.optionButton}
        onPress={()=> setVerOpciones('pendientes')}
        >
          <Text style={styles.optionButtonText}>Pendientes</Text>

        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={()=> setVerOpciones('completadas')}
        >
          <Text style={styles.optionButtonText}>Completadas</Text>

        </TouchableOpacity>

        </View>
      <Modal
        animationType='slide'
        transparent
        visible={modalVisible}
        onRequestClose={()=> setModalVisible(false)}
      >
          <View style={styles.modalContainer} >
            <FormPedidos
              newPedido={newPedido}
              handleInputChange={handleInputChange}
              handleAddPedido={handleAddPedido}
              setModalVisible={setModalVisible}
              
            />
          </View>
      </Modal>
      <ListaPedido
        pedido={filteredPedidos()}
        onModal={handleModal}
        onCheckBoxToggle={handleCheckBoxToggle}
      />
      <ListaPedido
        pedido={pedidosFinalizados}
        onModal={handleModal}
        onCheckBoxToggle={handleCheckBoxToggle}
      />
      
      <ModalDelete
      pedido={pedidoSelect}
      visible={deleteModalVisible}
      onModal={()=> setDeleteModalVisible(false)}
      onDelete={handleDelete}
      />


    </View>
  );
}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colores.terciario,
    alignItems: 'center',
    justifyContent: 'start',
  },
  modalContainer:{
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonAgregarContainer:{
    padding: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  botonAgregar:{
    width: '100%',
    backgroundColor: colores.terciario,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,

  },
  botonAgregarText:{
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Lato'
  },

});
