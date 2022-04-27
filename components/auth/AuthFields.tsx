import { View, Text, TextInput, Button } from 'react-native';
import Auth from '../../interfaces/auth';
import auth from '../../models/auth';

type AuthFieldProps = {
  auth: Partial<Auth>,
  title: string
  setAuth: (auth: Partial<Auth>) => void,
  submit: () => void,
};

export default function AuthFields({ props } : { props: AuthFieldProps}) {
  return <View>
      <Text>{props.title}</Text>
      <Text>E-post</Text>
      <TextInput 
        onChangeText={
          (content: string) => props.setAuth({...props.auth, email:content})
        }
        //value={auth?.email}
        keyboardType="email-address"
      />
      <Text>Løsenord</Text>
      <TextInput 
        onChangeText={
          (content: string) => props.setAuth({...props.auth, password:content})
        }
        //value={auth?.password}
        secureTextEntry={true}
      />

      <Button 
        title={props.title}
        onPress={() => props.submit}
      />
  </View>
}