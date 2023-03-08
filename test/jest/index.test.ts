import {authorizationMiddleware, User, Plugin} from '../../src';
import {billingPlugin, cloudProductPlugin} from '../../src';

describe('middleware', () => {
    describe('authorizationMiddleware', () => {
        it('should call the next middleware function if the user is authorized for billing', async () => {
            // Arrange
            const req = {user: {id: '123', name: 'John Doe', email: 'john.doe@example.com'}, path: '/billing'};
            const res = {};
            const next = jest.fn();

            // Act
            await authorizationMiddleware({billing: billingPlugin})(req, res, next);

            // Assert
            expect(next).toHaveBeenCalled();
        });

        it('should call the next middleware function if the user is authorized for cloud-product', async () => {
            // Arrange
            const req = {user: {id: '123', name: 'John Doe', email: 'john.doe@example.com'}, path: '/cloud-products'};
            const res = {sendStatus: jest.fn()};
            const next = jest.fn();

            // Act
            await authorizationMiddleware({cloudProducts: cloudProductPlugin})(req, res, next);

            // Assert
            expect(next).toHaveBeenCalled();
        });
    });
});

describe('plugins', () => {
    describe('billingPlugin', () => {
        it('should return true if the user has a customer account', async () => {
            // Arrange
            const user: User = {id: '123', name: 'John Doe', email: 'john.doe@example.com'};

            // Act
            const result = await billingPlugin(user, '/billing');

            // Assert
            expect(result).toEqual(true);
        });
    });
    describe('cloudProductPlugin', () => {
        it('should return true if the user has less than 3 projects', async () => {
            // Arrange
            const user: User = {id: '123', name: 'John Doe', email: 'john.doe@example.com'};

            // Act
            const result = await cloudProductPlugin(user, '/cloud_product');

            // Assert
            expect(result).toEqual(true);
        });
    });
});


describe('myPlugin', () => {
    const user = { id: '123', name: 'John Doe', email: 'john.doe@example.com' };

    it('should return true if the user is authorized to access the resource', async () => {
        // Arrange
        const reqPath = '/my-resource';
        const myPlugin: Plugin = async (user, reqPath) => {
            // Perform some logic to check if the user is authorized to access the requested resource
            // ...
            console.log(user, reqPath);

            return true;
        };

        // Act
        const result = await myPlugin(user, reqPath);

        // Assert
        expect(result).toEqual(true);
    });

    it('should return false if the user is not authorized to access the resource', async () => {
        // Arrange
        const reqPath = '/my-resource';
        const myPlugin: Plugin = async (user, reqPath) => {
            // Perform some logic to check if the user is authorized to access the requested resource
            // ...
            console.log(user, reqPath);
            return false;
        };

        // Act
        const result = await myPlugin(user, reqPath);

        // Assert
        expect(result).toEqual(false);
    });
});


