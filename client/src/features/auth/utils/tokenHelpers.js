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

export const saveTokenToLS = (token) =>
  localStorage.setItem(process.env.REACT_APP_TOKEN_NAME, token);

export const getTokenFromLS = () =>
  localStorage.getItem(process.env.REACT_APP_TOKEN_NAME);

export const removeTokenFromLS = () =>
  localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
