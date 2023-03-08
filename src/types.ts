export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthorizationStrategy {
    plugin: string;
    authorize: (user: User, reqPath: string) => Promise<boolean>;
    compose?: (otherStrategy: AuthorizationStrategy) => AuthorizationStrategy;
}

export type Plugin = (user: User, reqPath: string) => Promise<boolean>;

