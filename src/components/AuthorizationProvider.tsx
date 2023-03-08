import React, {createContext} from 'react';
import {composeStrategies} from '../utils';
import {authorizationMiddleware} from '../middleware';
import {AuthorizationStrategy, Plugin} from '../types';

interface AuthorizationProviderProps {
    plugins: Record<string, Plugin>;
    strategies: AuthorizationStrategy[];
    pluginPaths?: string[];
    children: React.ReactNode;
}

// Create context for the authorization middleware
export const AuthorizationContext = createContext<(req: any, res: any, next: any) => any>(() => {});

// Create the authorization middleware and provide it through the context
export const AuthorizationProvider: React.FC<AuthorizationProviderProps> =
    ({plugins, strategies, pluginPaths = [], children,}) => {
        const filteredPlugins = Object.entries(plugins)
            .filter(([serviceName, _]) => pluginPaths.length === 0 || pluginPaths.includes(serviceName))
            .map(([_, plugin]) => plugin);

        const pluginStrategies = filteredPlugins.map((plugin) => {
            return {
                plugin: plugin.name,
                async authorize(dependencies: Record<string, unknown>, reqPath: string) {
                    return plugin(dependencies, reqPath);
                },
            };
        });

        const allStrategies = [...pluginStrategies, ...strategies];
        const composedStrategy = composeStrategies(allStrategies);
        const middleware = authorizationMiddleware([composedStrategy]);

        return <AuthorizationContext.Provider value={middleware}>{children}</AuthorizationContext.Provider>;
    };
