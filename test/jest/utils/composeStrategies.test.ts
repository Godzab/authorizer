import {composeStrategies} from '../../../src';

describe('composeStrategies', () => {
    it('should return true if all strategies return true', async () => {
        const strategies = [
            {
                plugin: 'test',
                async authorize() {
                    return true;
                },
            },
            {
                plugin: 'test_1',
                async authorize() {
                    return true;
                },
            },
        ];
        const authStrategy = composeStrategies(strategies);
        const user = { id: '123', name: 'Test User', email: 'test@test.com' };
        const result = await authStrategy.authorize(user, "");
        expect(result).toBe(true);
    });

    it('should return false if any strategy returns false', async () => {
        const strategies = [
            {
                plugin: 'test',
                async authorize() {
                    return false;
                },
            },
            {
                plugin: 'test_1',
                async authorize() {
                    return true;
                },
            },
        ];
        const authStrategy = composeStrategies(strategies);
        const user = { id: '123', name: 'Test User', email: 'test@test.com' };
        const result = await authStrategy.authorize(user, "");
        expect(result).toBe(false);
    });
});
