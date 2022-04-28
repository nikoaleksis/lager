import config from '../config/config.json';
import Auth from '../interfaces/auth';
import storageModel from './storage';

const urlPath = 'auth';

const auth = {
    isLoggedIn: async function loggedIn() {
        const tokenAndDate = await storageModel.readToken();
        const twentyFourHours = 1000 * 60 * 60 * 24;
        const notExpired = (new Date().getTime() - tokenAndDate.date) < twentyFourHours;
        
        return tokenAndDate.token && notExpired;
    },
    login: async function login(auth: Partial<Auth>) {
        const payload = JSON.stringify({
            api_key: config.api_key,
            email: auth.email,
            password: auth.password,
        });
        const response = await fetch(
            `${config.base_url}/${urlPath}/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: payload,
            }
        );
        const result = await response.json();
        if ('data' in result && 'token' in result.data) {
          storageModel.storeToken(result.data.token);
          return result.data.token
        }
        return undefined;
    },
    register: async function register(auth: Partial<Auth>) {
        const payload = JSON.stringify({
            email: auth.email,
            password: auth.password,
            api_key: config.api_key,
        });
        
        const response = await fetch(
            `${config.base_url}/${urlPath}/register`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: payload,
            }
        );
        const result = await response.json();
        return result
    },
    logout: async function logout() {
      return await storageModel.deleteToken();
    }
};

export default auth;