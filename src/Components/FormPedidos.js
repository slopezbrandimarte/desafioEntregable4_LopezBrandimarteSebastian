import { StyleSheet, Text, TextInput, TouchableOpacity, Modal, FlatList, View} from 'react-native'
import React from 'react'
import colores from '../Global/colores'
import { useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import  Icon from 'react-native-vector-icons/EvilIcons'





const FormPedidos = ({
  newPedido = {},
  handleInputChange,
  handleAddPedido,
  setModalVisible,

}) => {
  
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false)
  const [selectedCategoria, setSelectedCategoria] = useState('')
 

  
  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }
  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const showCategoryModal = () => {
    setCategoryModalVisible(true)
  }

  const hideCategoryModal = () => {
    setCategoryModalVisible(false)
  }

  const handleConfirm = (date) => {
    hideDatePicker()
    const fechaFormateada = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    handleInputChange('vencimiento',fechaFormateada)
    handleInputChange('categirua', selectedCategoria)
  }

  const handleCategorySelection = (category) => {
    setSelectedCategoria(category);
    handleInputChange('categoria', category);  // Actualiza newPedido con la categoría seleccionada
    hideCategoryModal();
  }
  const handleAgregarPedido = () => {
    

  
    handleAddPedido(selectedCategoria);

    // Limpia la fecha de vencimiento y oculta el modal
    handleInputChange('vencimiento', '')
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
  

  const categoryOptions = [

    { label: 'Senasa', value: 'Senasa' },
    { label: 'Cancelaciones', value: 'Cancelaciones' },
    { label: 'Post-embarque', value: 'Post-embarque' },
    { label: 'Rancho', value: 'Rancho' },
  ]


  

    
  return (
    <View style={styles.container}>
      <View style={styles.containerMayor}>
        <View style={styles.formContainer}>

          <TouchableOpacity onPress={showCategoryModal} style={styles.touchable}>
            <Text>{newPedido.categoria ? newPedido.categoria : 'Seleccione la categoría'}</Text>
          </TouchableOpacity>
          
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

            <Modal
              visible={isCategoryModalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={hideCategoryModal}
              
              >
              <View style={styles.categoryModalContainer}>
                <FlatList
                  data={categoryOptions}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.categoryModalItem}
                      onPress={() => {
                        handleCategorySelection(item.label)
                        hideCategoryModal()
                      }}
                    >
                      <Text>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </Modal>
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
   /*  alignItems: "center", */
    elevation: 5, // Sombras para Android
    shadowColor: "#000", // Sombras para iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  touchableText: {
    color: '#333',
  },
  categoryTouchable: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  categoryText: {
    color: '#333',
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
  categoryModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginTop:15,
    marginBottom: 'auto'
    
  },
  modalCategories:{
    justifyContent: 'center',
    alignContent: 'center',
    margin:'15'
  },
  categoryModalItem: {
    height: 40,
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 10,
    justifyContent: 'center',
    
  },
  categoryModalItemText: {
    color: '#333',
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
  

})