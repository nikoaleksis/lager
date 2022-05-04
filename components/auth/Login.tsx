import { useEffect, useState } from 'react';
import AuthFields from './AuthFields';
import Auth from '../../interfaces/auth';
import { Alert } from 'react-native';
import authModel from '../../models/auth';

function alertIncorrectCredentials() {

  Alert.alert(
    'Felaktiga inloggningsuppgifter',
    'Felaktig e-post eller løsenord',
    [
      { text: "Ok", }
    ]
  );
}

export default function Login({ navigation, setIsLoggedIn }){
  const [auth, setAuth] = useState<Partial<Auth>>({});

  async function doLogin() {
    if (auth.email && auth.password) {
      const result = await authModel.login(auth);
      if (result) {
        setIsLoggedIn(true);
        return;
      }
      alertIncorrectCredentials();
    }
  }

  return (
    <AuthFields 
      auth={auth}
      setAuth={setAuth}
      submit={doLogin}
      title="Logga in"
      navigation={navigation}
    />
  )
}