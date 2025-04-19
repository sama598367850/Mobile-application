import React, { useState } from 'react'; 
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native'; 
import { Feather } from '@expo/vector-icons'; 

export default function Chat() { 
  const [message, setMessage] = useState(''); 
  const [savedMessage, setSavedMessage] = useState(''); 
  const [isEditing, setIsEditing] = useState(false); 

  const handleSend = () => { 
    if (message.trim() !== '') { 
      setSavedMessage(message); 
      setMessage(''); 
      setIsEditing(false); 
    } 
  }; 

  const handleEdit = () => { 
    setMessage(savedMessage); 
    setIsEditing(true); 
  }; 

  const handleDelete = () => { 
    setSavedMessage(''); 
    setMessage(''); 
    setIsEditing(false); 
  }; 

  return ( 
    <SafeAreaView style={styles.container}> 
      <Text style={styles.note}>Note:{"\n"}Don’t provide any personal{"\n"}information!</Text> 

      {savedMessage !== '' && ( 
        <View style={styles.messageBox}> 
          <Text style={styles.messageText}>{savedMessage}</Text> 
        </View> 
      )} 

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        keyboardVerticalOffset={20} 
      > 
        <View style={styles.inputBar}> 
          <TextInput 
            placeholder="Type something" 
            placeholderTextColor="#888" 
            value={message} 
            onChangeText={setMessage} 
            onSubmitEditing={handleSend} 
            style={styles.input} 
            returnKeyType="done" 
          /> 
          <TouchableOpacity onPress={handleSend}> 
            <Feather name="send" size={18} color="#444" /> 
          </TouchableOpacity> 
        </View> 
      </KeyboardAvoidingView> 
    </SafeAreaView> 
  ); 
} 

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: '#C7D9E5', 
    paddingHorizontal: 20, 
    paddingTop: 50, 
    justifyContent: 'space-between', 
  }, 
  note: { 
    textAlign: 'center', 
    color: '#a0a0a0', 
    fontSize: 16, 
    fontWeight: '600', 
  }, 
  messageBox: { 
    backgroundColor: '#F4EFEB', 
    borderRadius: 10, 
    padding: 12, 
    marginVertical: 10, 
  }, 
  messageText: { 
    fontSize: 16, 
    color: '#333', 
  }, 
  inputBar: { 
    backgroundColor: '#F4EFEB', 
    borderRadius: 10, 
    paddingHorizontal: 12, 
    paddingVertical: 10, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10, 
  }, 
  input: { 
    flex: 1, 
    fontSize: 14, 
    color: '#000', 
    marginRight: 8, 
  }, 
}); 
