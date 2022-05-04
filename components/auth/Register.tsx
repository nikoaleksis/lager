import { useState } from "react";
import { Alert } from 'react-native';
import Auth from "../../interfaces/auth";
import authModel from "../../models/auth";
import AuthFields from "./AuthFields";

function errorMsg() {
  Alert.alert(
    "Något gick fel",
    'Anvændaren kanske redan existerar',
    [
      { text: "Ok", }
    ]
  );
}

export default function Register({ navigation } : { navigation : any}) {
  const [auth, setAuth] = useState<Partial<Auth>>({});

  async function doRegister() {
    if (auth.email && auth.password) {
      const result = await authModel.register(auth);
      if (result > 201) {
        errorMsg();
        return;
      }
      navigation.navigate("Login");
    }
  }

  return (
    <AuthFields 
      auth={auth}
      setAuth={setAuth}
      submit={doRegister}
      title="Registrera"
      navigation={navigation}
    />
  )
}