import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TextInput, Button } from 'react-native';
import { showMessage } from 'react-native-flash-message';
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
  
  function validatePassword(text: string) {
    const errorDescription = "Løsenordet måste innehålla minst 4 tecken, små och stora bokstæver, siffror och specialtecken";
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!\.-]).{4,}$/; // Regex for valid pw

    if (!text.match(pattern)) {
      showMessage({
        message: 'Icke giltigt løsenord',
        description: errorDescription,
        type: 'warning'
      });
    }
  }

  function validateEmail(text: string) {
    const errorDescription = "Du behøver ange en godkænd e-post.";
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Regex for valid email

    if (!text.match(pattern)) {
      showMessage({
        message: 'Icke giltigt email',
        description: errorDescription,
        type: 'warning'
      });
    }
  }

  return <View style={Base.base}>
      <Text style={Typography.header1}>{props.title}</Text>
      
      <Text style={Typography.label}>E-post</Text>
      <TextInput
        testID="email-field"
        style={Form.input}
        onChangeText={
          (content: string) => {
            validateEmail(content);
            props.setAuth({...props.auth, email: content});
          }
        }
        autoCapitalize="none"
        autoCompleteType="off"
        keyboardType="email-address"
        //value={auth?.email}
      />
      
      <Text style={Typography.label}>Løsenord</Text>
      <TextInput
        testID="pw-field"
        style={Form.input}
        onChangeText={
          (content: string) => {
            validatePassword(content);
            props.setAuth({...props.auth, password:content})
          }
        }
        secureTextEntry={true}
        autoCompleteType="off"
        autoCapitalize="none"
        //value={auth?.password}
      />
      <Button
        accessibilityLabel="Logga in genom att klicka"
        color={'#222'}
        title={props.title}
        onPress={() => props.submit()}
      />
      <View style={Form.div(14)}/> 
      {props.title === 'Logga in' &&
        <Button
          accessibilityLabel="Registrera dig genom att klicka"
          color={'#222'}
          title='Registrera dig'
          onPress={() => props.navigation.navigate('Register')}
        />
      }
  </View>
}