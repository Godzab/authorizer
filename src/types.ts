export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthorizationStrategy {
    // Method for performing authorization checks
    authorize: (user: User, reqPath: string) => Promise<boolean>;

    // Optional method for composing this strategy with another strategy
    compose?: (otherStrategy: AuthorizationStrategy) => AuthorizationStrategy;
}

export type Plugin = (user: User, reqPath: string, authStrategy: any) => Promise<boolean>;

