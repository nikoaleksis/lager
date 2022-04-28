import { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import authModel from '../../models/auth';
import { Base, Form } from '../../styles';

export default function Logout({ navigation, setIsLoggedIn }){

  async function doLogout() {
    const isLoggedOut = await authModel.logout();
    if (isLoggedOut) {
      setIsLoggedIn(false)
    }
  }

  return (
    <View style={Base.base}>
      <View style={ Form.div(300) }/>
      <Button
        color={'#222'}
        title='Logga ut'
        onPress={ () => doLogout() }
      />
    </View>
  )
}