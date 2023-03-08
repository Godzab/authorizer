export interface AuthorizationStrategy {
    plugin: string;
    authorize: (dependencies: Record<string, unknown>, reqPath: string) => Promise<boolean>;
    compose?: (otherStrategy: AuthorizationStrategy) => AuthorizationStrategy;
}

export type Plugin = (dependencies: Record<string, unknown>, reqPath: string) => Promise<boolean>;