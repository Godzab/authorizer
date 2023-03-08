import { authorizationMiddleware, AuthorizationStrategy } from '../../../src';

describe('authorizationMiddleware', () => {
    let strategies: AuthorizationStrategy[];

    beforeEach(() => {
        strategies = [
            {
                plugin: 'test',
                async authorize(user: Record<string, unknown>) {
                    return user.id === '123';
                },
            },
            {
                plugin: 'test_1',
                async authorize(user:  Record<string, unknown>) {
                    return user === user;
                },
            },
        ];
    });

    it('should call the next function if authorized', async () => {
        const user = { id: '123', name: 'Test User', email: 'test@test.com' };
        const res = jest.fn();
        const next = jest.fn();

        const middleware = authorizationMiddleware(strategies);

        await middleware(user, res, next);

        expect(next).toHaveBeenCalledTimes(1);
    });

    it('should send a 403 status code if not authorized', async () => {
        const user = { id: '456', name: 'Test User', email: 'test@test.com' };
        const res = jest.fn();
        const next = jest.fn();

        const middleware = authorizationMiddleware(strategies);

        await middleware(user, res, next);

        expect(res).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    it('should throw an error if strategy is not found', async () => {
        await expect(() => authorizationMiddleware([])).toThrowError(
            'Cannot compose an empty array of strategies',
        );
    });
});
