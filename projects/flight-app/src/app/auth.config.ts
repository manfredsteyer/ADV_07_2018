import { AuthConfig } from 'angular-oauth2-oidc';
 
export const authConfig: AuthConfig = {

  // Wer ist Auth-Server?
  issuer: 'https://steyer-identity-server.azurewebsites.net/identity',
 
  // Wer bin ich?
  redirectUri: window.location.origin + '/index.html',
  clientId: 'spa-demo',

  showDebugInformation: true,

  // Was will ich?
  scope: 'openid profile email voucher',
  //            Identity      | Access
  //            ID_Token      | Access_Token
  //            OIDC          | Wir/ Use-Case-Spezific
}