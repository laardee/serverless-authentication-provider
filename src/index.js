'use strict';

import { Profile, Provider } from 'serverless-authentication';

/**
 * Profile mapping function
 * @param response
 */

function mapProfile(response) {
  const overwrites = {
    name: response.displayName,
    email: response.emails ? response.emails[0].value : null,
    picture: response.image.url,
    provider: 'example'
  };

  return new Profile(Object.assign(response, overwrites));
}

class ExampleProvider extends Provider {

  /**
   * Signin function
   * @param scope
   * @param state
   * @param callback, returns url that will be used for redirecting to oauth provider signin page
   */
  signinHandler({ scope = 'profile', state }, callback) {
    const options = Object.assign(
      { scope, state },
      { signin_uri: 'https://auth.laardee.com/oauth', response_type: 'code' }
    );

    super.signin(options, callback);
  }

  /**
   * Callback function
   * @param event
   * @param callback, returns user profile
   */
  callbackHandler(event, callback) {
    const options = {
      authorization_uri: 'https://auth.laardee.com/oauth/token',
      profile_uri: 'https://api.laardee.com/me',
      profileMap: mapProfile,
      authorizationMethod: 'POST'
    };

    super.callback(
      event,
      options,
      { authorization: { grant_type: 'authorization_code' } },
      callback
    );
  }
}

const signinHandler = (config, options, callback) =>
  (new ExampleProvider(config)).signinHandler(options, callback);

const callbackHandler = (event, config, callback) =>
  (new ExampleProvider(config)).callbackHandler(event, callback);

exports.signinHandler = signinHandler;
exports.signin = signinHandler; // old syntax, remove later
exports.callbackHandler = callbackHandler;
exports.callback = callbackHandler; // old syntax, remove later
