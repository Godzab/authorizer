import { Plugin, User } from '../types';

export function authorizationMiddleware(
    plugins: Record<string, Plugin>,
    pluginPaths: string[] = [],
) {
    return async (req: any, res: any, next: any) => {
        // Get the authenticated user from the request object
        const user: User = req.user;

        // Filter the plugins based on the pluginPaths array, if provided
        const filteredPlugins = Object.entries(plugins)
            .filter(([serviceName, plugin]) => {
                console.log(plugin);
                return pluginPaths.length === 0 || pluginPaths.includes(serviceName);
            })
            .map(([_, plugin]) => plugin);

        // Check if the user is authorized to access the requested resource
        const isAuthorized = await checkAuthorization(filteredPlugins, user, req.path);

        if (!isAuthorized) {
            res.sendStatus(403);
            return;
        }

        next();
    };
}

async function checkAuthorization(
    plugins: Plugin[],
    user: User,
    reqPath: string
): Promise<boolean> {
    // Iterate over each plugin and check if the user is authorized
    for (const plugin of plugins) {
        const isAuthorized = await plugin(user, reqPath);

        if (!isAuthorized) {
            return false;
        }
    }

    return true;
}
