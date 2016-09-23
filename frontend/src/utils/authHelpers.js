import jwtDecode from 'jwt-decode';
import { userRoles } from '@constants/values';

export const checkIsAdmin = (userRole) => userRole === userRoles.ADMINISTRATOR;

export const isTokenValid = (token) => {
    if (token) {
        const decoded = jwtDecode(token);

        if (decoded.exp > (new Date().getTime() / 1000)) {
            return true;
        }
    }

    return false;
};
