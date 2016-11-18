import jwtDecode from 'jwt-decode';
import { userRoles } from '@src/constants/values';

export const checkIsAdmin = (userRole) => userRole === userRoles.ADMINISTRATOR;

export const decodeToken = (token) => jwtDecode(token);

export const isTokenValid = (token) => {
    if (token) {
        if (decodeToken(token).exp > (new Date().getTime() / 1000)) {
            return true;
        }
    }

    return false;
};
