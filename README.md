# Authorization Middleware

A package for authorizing access to a collection of services in a React application.

## Installation

To install the package, run the following command:


## Usage

To use the package, follow these steps:

1. Import the `AuthorizationProvider` component from the package:

   ```typescript
   import { AuthorizationProvider } from 'authorization-middleware';
    ```
2. Wrap your application with the AuthorizationProvider component, passing in the necessary props:

    ``` typescript
    <AuthorizationProvider plugins={plugins}>
      <App />
    </AuthorizationProvider>
    ```
    The plugins prop should be a record of plugins, where each key is the name of the plugin and each value is the plugin function itself.

3. Use the useAuthorization hook in any child components that need to access the authorization middleware:

    ```typescript
    import { useAuthorization } from 'authorization-middleware';
    
    function MyComponent() {
      const middleware = useAuthorization();
      // Use the middleware function here
      // ...
    }
    
    ```

For more information on the usage of the package, see the API documentation.

## API
### AuthorizationProvider
The `AuthorizationProvider` component is used to initialize the authorization middleware and provide it to child components. The component takes the following props:

`plugins` (required): A record of plugins, where each key is the name of the plugin and each value is the plugin function itself.
`pluginPaths` (optional): An array of paths that can be used to filter the plugins that are used for a specific request.

```typescript
interface AuthorizationProviderProps {
  plugins: Record<string, Plugin>;
  pluginPaths?: string[];
}

<AuthorizationProvider plugins={plugins} pluginPaths={['/billing']}>
  // Child components
</AuthorizationProvider>
```