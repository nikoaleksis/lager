import { useEffect, useState } from 'react';
import AuthFields from './AuthFields';
import Auth from '../../interfaces/auth';
import authModel from '../../models/auth';

export default function Login({ navigation, setIsLoggedIn }){
  const [auth, setAuth] = useState<Partial<Auth>>({});

  async function doLogin() {
    if (auth.email !== undefined && auth.password !== undefined) {
      const result = await authModel.doLogin(auth.email, auth.password);
      setIsLoggedIn(true);
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
}