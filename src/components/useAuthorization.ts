import {useContext} from 'react';
import {AuthorizationContext} from './AuthorizationProvider';

export const useAuthorization = () => {
    return useContext(AuthorizationContext);
};
