'use strict';

import {Profile, Provider} from 'serverless-authentication';

class ExampleProvider extends Provider {

  /**
   * Signin function
   * @param scope
   * @param state
   * @param callback, returns url that will be used for redirecting to oauth provider signin page
   */
  signin({scope = 'profile', state}, callback){
    let options = Object.assign(
      {scope, state},
      {signin_uri: 'https://auth.laardee.com/oauth', response_type: 'code'}
    );
    super.signin(options, callback);
  }

  /**
   * Callback function
   * @param event
   * @param callback, returns user profile
   */
  callback(event, callback){
    var options = {
      authorization_uri: 'https://auth.laardee.com/oauth/token',
      profile_uri: 'https://api.laardee.com/me',
      profileMap: mapProfile,
      authorizationMethod: 'POST'
    };
    super.callback(event, options, {authorization: {grant_type: 'authorization_code'}}, callback);
  }
}

/**
 * Profile mapping function
 * @param response
 */

function mapProfile(response) {
  return new Profile({
    id: response.id,
    name: response.displayName,
    email: response.emails ? response.emails[0].value : null,
    picture: response.image.url,
    provider: 'example',
    _raw: response
  });
}

export function signin(config, options, callback) {
  (new ExampleProvider(config)).signin(options, callback);
}

export function callback(event, config, callback) {
  (new ExampleProvider(config)).callback(event, callback);
}