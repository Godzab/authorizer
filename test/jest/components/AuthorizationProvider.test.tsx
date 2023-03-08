import * as React from 'react';
import { render, screen } from '@testing-library/react';
import {AuthorizationContext, AuthorizationProvider} from '../../../src';
import { billingPlugin, cloudProductPlugin } from '../../../src';

describe('AuthorizationProvider', () => {
    const plugins = {
        billing: billingPlugin,
        cloudProduct: cloudProductPlugin,
    };

    const strategies = [
        {
            plugin: 'test',
            async authorize() {
                return true;
            },
        },
    ];

    it('should render child components if authorized', async () => {
        render(
            <AuthorizationProvider plugins={plugins} strategies={strategies}>
                <AuthorizationContext.Consumer>
                    {(authorize) => {
                        if (authorize) {
                            return <div>Billing content</div>;
                        }
                        return <div>You are not authorized to view this content</div>;
                    }}
                </AuthorizationContext.Consumer>
            </AuthorizationProvider>,
        );

        expect(screen.getByText('Billing content')).toBeDefined();
    });
});
