import jwtDecode from 'jwt-decode';

export const decodeToken = (token) => jwtDecode(token);

export const isTokenValid = (token) => {
    if (token) {
        if (decodeToken(token).exp > (new Date().getTime() / 1000)) {
            return true;
        }
    }

    return false;
};

export const saveTokenToLocalStorage = (token) =>
    localStorage.setItem(process.env.REACT_APP_TOKEN_NAME, token);

export const getTokenFromLocalStorage = () =>
    localStorage.getItem(process.env.REACT_APP_TOKEN_NAME);

export const removeTokenFromLocalStorage = () =>
    localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
