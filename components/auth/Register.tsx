import { useState } from "react";
import Auth from "../../interfaces/auth";
import authModel from "../../models/auth";
import AuthFields from "./AuthFields";

export default function Register({ navigation }) {
  const [auth, setAuth] = useState<Partial<Auth>>({});

  async function doRegister() {
    if (auth.email && auth.password) {
      const result = await authModel.register(auth);
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