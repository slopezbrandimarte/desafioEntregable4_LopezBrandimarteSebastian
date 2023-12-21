import { StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React from 'react'
import colores from '../Global/colores'
import { useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import  Icon from 'react-native-vector-icons/EvilIcons';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';



const FormPedidos = ({
  newPedido = {},
  handleInputChange,
  handleAddPedido,
  setModalVisible,
}) => {
  
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedCategoria,setSelectedCategoria] = useState()

  
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  }
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  }

  const handleConfirm = (date) => {
    hideDatePicker()
    const fechaFormateada = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    handleInputChange('vencimiento', fechaFormateada)
  }
  const handleAgregarPedido = () => {
    

    // Llama a la función para agregar el pedido
    handleAddPedido();

    // Limpia la fecha de vencimiento y oculta el modal
    handleInputChange('vencimiento', '');
    setModalVisible(false);
  }
  const handleCancelar = () => {
    handleInputChange('exportador', '')
    handleInputChange('accion', '') 
    handleInputChange('identificacion', '')
    handleInputChange('buque', '')
    handleInputChange('vencimiento', '')

    hideDatePicker()
    setModalVisible(false)
  }
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categoryOptions = [
    { label: 'Seleccione la categoría', value: '' },
    { label: 'Senasa', value: 'Senasa' },
    { label: 'Cancelaciones', value: 'Cancelaciones' },
    { label: 'Post-embarque', value: 'Post-embarque' },
    { label: 'Rancho', value: 'Rancho' },
  ]


  

    
  return (
    <View style={styles.container} >
      <View style={styles.containerMayor} >
        <View style={styles.formContainer} >
          
            <TextInput 
              style={styles.input} 
              placeholder='Exportador/Importador' 
              value={newPedido.exportador}
              onChangeText={(t) => handleInputChange('exportador', t)}
            />
            <TextInput 
              style={styles.input} 
              placeholder='Accion' 
              value={newPedido.accion}
              onChangeText={(t) => handleInputChange('accion', t)}
            />
            <TextInput 
              style={styles.input} 
              placeholder='Identificacion' 
              value={newPedido.identificacion}
              onChangeText={(t) => handleInputChange('identificacion', t)}
            />
            <TextInput 
              style={styles.input} 
              placeholder='Buque' 
              value={newPedido.buque}
              onChangeText={(t) => handleInputChange('buque' , t)}
            />
            

            <TouchableOpacity onPress={showDatePicker} style={styles.touchable}>
              <Text>{newPedido.vencimiento ? newPedido.vencimiento : 'Seleccionar fecha de vencimiento'}</Text>
            </TouchableOpacity>
            
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <TouchableOpacity 
              onPress={handleAgregarPedido}
              
              style={styles.touchable}>
                <Text>AGREGAR</Text>
            </TouchableOpacity>
            
            <Icon style={styles.iconClose} name="close-o" size={35} color="black" onPress={handleCancelar} />
        </View>
      </View> 
    </View>
  )
}

export default FormPedidos

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerMayor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
    backgroundColor: "#fff", 
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5, // Sombras para Android
    shadowColor: "#000", // Sombras para iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: colores.letras,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 10,
    textAlign: 'center',
  },
  closeICon:{
    position: 'absolute',
    top: 10,
    right: 10,
  
  },
  touchable:{
    height: 40,
    width: 300,
    borderColor: colores.letras,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  iconClose:{
    position: 'absolute',
    top: -20,
    right: -20,
  },
  itemStyle:{
    color:" black",
  }

})