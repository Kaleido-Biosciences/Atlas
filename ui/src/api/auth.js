import auth0 from 'auth0-js';
import history from '../history';
import axios from 'axios';
import qs from 'qs'
import {
  COGNITO_DOMAIN,
  COGNITO_CLIENT_ID,
  COGNITO_CALLBACK_URL,
  COGNITO_SECRET,
  COGNITO_USERINFO_ENDPOINT,
  COGNITO_TOKEN_ENDPOINT
} from "../config";

export default class Auth {
  // Please use your own credentials here
  auth0 = new auth0.WebAuth({
    domain: `${COGNITO_DOMAIN}`,
    clientID: `${COGNITO_CLIENT_ID}`,
    redirectUri: `${COGNITO_CALLBACK_URL}`,
    audience: `${COGNITO_USERINFO_ENDPOINT}`,
    responseType: 'code',
    scope: 'openid'
  });

  login = () => {
    this.auth0.authorize();
  };

  // Sets user details in localStorage
  setSession = (authResult) => {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expires_in * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('id_token', authResult.id_token);
    localStorage.setItem('refresh_token', authResult.refresh_token);
    localStorage.setItem('expires_at', expiresAt);
  };

  // removes user details from localStorage
  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/home');
  };

  // checks if the user is authenticated
  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  };


  awsCallTokenEndpoint = async (grantType, accessToken) =>  {
    console.log(accessToken);
    const data = {
      grant_type: grantType,
      client_id: `${COGNITO_CLIENT_ID}`,
      code: accessToken,
      scope: 'profile',
      redirect_uri: `${COGNITO_CALLBACK_URL}`,
    };
    const p = {
      method: 'post',
      url: `${COGNITO_TOKEN_ENDPOINT}`,
      data: qs.stringify(data),
      auth: {
        username: `${COGNITO_CLIENT_ID}`,
        password: `${COGNITO_SECRET}`,
      },
    };
    console.log(`AWS oauth2/token request parameters: ${JSON.stringify(p)}`);
    const awsResponse = await axios(p);
    console.log(`AWS oauth2/token response : ${JSON.stringify(awsResponse.data)}`);
    return awsResponse;
  };

}
