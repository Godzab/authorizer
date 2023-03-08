import React, {createContext} from 'react';
import {authorizationMiddleware} from '../middleware';
import {Plugin} from '../types';

interface AuthorizationProviderProps {
    plugins: Record<string, Plugin>;
    pluginPaths?: string[];
    children: React.ReactNode;
}

// Create context for the authorization middleware
export const AuthorizationContext = createContext<(req: any, res: any, next: any) => void>(() => {});

// Create the authorization middleware and provide it through the context
export const AuthorizationProvider: React.FC<AuthorizationProviderProps> = ({plugins, pluginPaths = [], children}) => {
    const middleware = authorizationMiddleware(plugins, pluginPaths);
    return (
        <AuthorizationContext.Provider value={middleware}>
            {children}
        </AuthorizationContext.Provider>
    );
};
