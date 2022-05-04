import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
  storeToken: async function storageToken(token: string) {
    try {
      const tokenAndDate = {
        token: token,
        date: new Date().getTime()
      };
      const jsonValue = JSON.stringify(tokenAndDate);

      await AsyncStorage.setItem('@token', jsonValue)
    } catch (e) {
      //TBD
    }
  },
  readToken: async function readToken(): Promise<any> {
    try {
      const jsonValue = await AsyncStorage.getItem('@token');
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      //TBD
    }
  },
  deleteToken: async function deleteToken() {
    try {
      await AsyncStorage.removeItem('@token');
      return true;
    } catch (e) {
      return false;
    }
  },
};

export default storage;