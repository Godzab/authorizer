import { AuthorizationStrategy, User } from '../types';

/**
 * Composes an array of AuthorizationStrategy objects into a single strategy.
 *
 * @param strategies - The array of strategies to compose.
 * @returns The composed strategy.
 */
export function composeStrategies(strategies: AuthorizationStrategy[]): AuthorizationStrategy {
    if (strategies.length === 0) {
        throw new Error('Cannot compose an empty array of strategies');
    }

    const pluginNames = strategies.map((strategy) => strategy.plugin).join('_');

    return {
        plugin: pluginNames,
        async authorize(user: User, reqPath: string) {
            for (const strategy of strategies) {
                const isAuthorized = await strategy.authorize(user, reqPath);
                if (!isAuthorized) {
                    return false;
                }
            }
            return true;
        },
        compose(otherStrategy: AuthorizationStrategy) {
            return composeStrategies([...strategies, otherStrategy]);
        },
    };
}
