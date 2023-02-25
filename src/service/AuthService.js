import jwt_decode from "jwt-decode";
import { ApiService } from "./ApiService";

const KEY_TOKEN = 'userToken';
const KEY_SESSION_EXPIRATION = 'exp';

const getToken = () => {
    return localStorage.getItem(KEY_TOKEN);
}

const setToken = (token) => {
    localStorage.setItem(KEY_TOKEN, token);

    const decodedToken = jwt_decode(token);
    setSessionExpiration(decodedToken.expiration);
}

const getSessionExpiration = () => {
    return parseInt(localStorage.getItem(KEY_SESSION_EXPIRATION));
}

const setSessionExpiration = (expiration) => {
    localStorage.setItem(KEY_SESSION_EXPIRATION, expiration);
}

const getTime = () => {
    return (Date.now() / 1000) | 0;
};

const AuthService = {
    isLoggedIn: () => {
        return getToken() !== null;
    },
    getToken: () => {
        return getToken();
    },
    getSessionExpiration: () => {
        return getSessionExpiration();
    },
    isSessionExpired: () => {
        return getSessionExpiration() < getTime();
    },
    login: async (email, password) => {
        const data = await ApiService.post(ApiService.serverRoot() + "/authorize", {
            username: email,
            password: password
        }, false);
        setToken(data.token);
    },
    refresh: async () => {
        const data = await ApiService.post(ApiService.serverRoot() + "/authorize/refresh", {
            token: getToken()
        }, false);
        setToken(data.token);
    },
    logout: () => {
        localStorage.clear();
    }
}

export { AuthService };