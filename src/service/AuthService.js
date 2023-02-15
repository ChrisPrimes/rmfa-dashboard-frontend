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
        login: (email, password) => {
            setToken(123);
            return true;
        },
        logout: () => {
            localStorage.clear();
        }
    })
}

export { useAuth };