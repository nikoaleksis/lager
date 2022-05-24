import { useEffect, useState } from 'react';
import AuthFields from './AuthFields';
import Auth from '../../interfaces/auth';
import authModel from '../../models/auth';
import { showMessage } from 'react-native-flash-message';

export default function Login({ navigation, setIsLoggedIn }){
  const [auth, setAuth] = useState<Partial<Auth>>({});

  async function doLogin() {
    if (auth.email && auth.password) {
      const result = await authModel.login(auth);
      if (result.type === 'success') {
        setIsLoggedIn(true);
        showMessage(result);
        return;
      }
      showMessage(result);
      return;
    }
    showMessage({
      message: "Saknas",
      description: "E-post eller løsenord saknas",
      type: "warning",
    });
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