import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TextInput, Button } from 'react-native';
import Auth from '../../interfaces/auth';
import { Base, Typography, Form } from '../../styles';

type AuthFieldProps = {
  title: string,
  auth: Partial<Auth>,
  setAuth: (auth: Partial<Auth>) => void,
  submit: () => void,
  navigation: any
};

export default function AuthFields(props: AuthFieldProps) {
  return <View style={Base.base}>
      <Text style={Typography.header1}>{props.title}</Text>
      
      <Text style={Typography.label}>E-post</Text>
      <TextInput
        style={Form.input}
        onChangeText={
          (content: string) => props.setAuth({...props.auth, email:content})
        }
        autoCapitalize="none"
        autoCompleteType="off"
        keyboardType="email-address"
        //value={auth?.email}
      />
      
      <Text style={Typography.label}>Løsenord</Text>
      <TextInput
        style={Form.input}
        onChangeText={
          (content: string) => props.setAuth({...props.auth, password:content})
        }
        secureTextEntry={true}
        autoCompleteType="off"
        autoCapitalize="none"
        //value={auth?.password}
      />
      <Button 
        color={'#222'}
        title={props.title}
        onPress={() => props.submit()}
      />
      <View style={Form.div(14)}/> 
      {props.title === 'Logga in' &&
        <Button
          color={'#222'}
          title='Registrera dig'
          onPress={() => props.navigation.navigate('Register')}
        />
      }
  </View>
}