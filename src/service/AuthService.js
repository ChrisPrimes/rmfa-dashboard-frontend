import { ApiService } from "./ApiService";

const KEY_TOKEN = 'userToken';

const getToken = () => {
    return localStorage.getItem(KEY_TOKEN);
}

const setToken = (token) => {
    localStorage.setItem(KEY_TOKEN, token);
}

const useAuth = () => {
    return ({
        isLoggedIn: () => {
            return getToken() !== null;
        },
        getToken: () => {
            return getToken();
        },
        login: async (email, password) => {
            const data = await ApiService.post("http://localhost:8080/authorize", {
                username: email,
                password: password
            });
            setToken(data.token);
            return true;
        },
        logout: () => {
            localStorage.clear();
        }
    })
}

export { useAuth }; 
export default useAuth;