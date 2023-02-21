import { ApiService } from "./ApiService";

const KEY_TOKEN = 'userToken';

const getToken = () => {
    return localStorage.getItem(KEY_TOKEN);
}

const setToken = (token) => {
    localStorage.setItem(KEY_TOKEN, token);
}

const AuthService = {
    isLoggedIn: () => {
        return getToken() !== null;
    },
    getToken: () => {
        return getToken();
    },
    login: async (email, password) => {
        const data = await ApiService.post(ApiService.serverRoot() + "/authorize", {
            username: email,
            password: password
        }, false);
        setToken(data.token);
        return true;
    },
    logout: () => {
        localStorage.clear();
    }
}


export { AuthService };