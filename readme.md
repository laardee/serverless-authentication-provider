# Authentication provider example for Serverless Authentication

This is an example provider that can be used as a starting point when creating a new authentication provider for [Serverless Authentication boilerplate](https://github.com/laardee/serverless-authentication-boilerplate).

## Source - src/index.js
**ExampleProvider.signin**
The purpose of this function is to return redirect url to the authentication provider sign in page

**ExampleProvider.callback**
User profile should be returned in callback of this function.

## Tests - specs/
Basic authentication flow is mocked in specs/test-authentication.js. To run tests use `npm run compile-test` which first compiles src folder and then runs the tests.

## Examples

Following providers are build similar way than this example

* https://github.com/laardee/serverless-authentication-facebook
* https://github.com/laardee/serverless-authentication-google
* https://github.com/laardee/serverless-authentication-microsoft