import { AuthorizationStrategy, User } from '../types';
import { composeStrategies } from '../utils/composeStrategies';

/**
 * Creates a middleware function that performs authorization checks on incoming requests.
 *
 * @param strategies - The array of authorization strategies to use.
 * @returns The middleware function.
 */
export function authorizationMiddleware(strategies: AuthorizationStrategy[]): any {
    const composedStrategy = composeStrategies(strategies);

    return async (req: any, res: any, next: any) => {
        // Get the authenticated user from the request object
        const user: User = req.user;

        // Check if the user is authorized to access the requested resource
        const isAuthorized = await composedStrategy.authorize(user, req.path);

        if (!isAuthorized) {
            res.sendStatus(403);
            return;
        }

        next();
    };
}

