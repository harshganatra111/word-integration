import { Configuration, BrowserCacheLocation } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: 'PASTE_YOUR_CLIENT_ID_HERE',
    authority: 'https://login.microsoftonline.com/PASTE_YOUR_TENANT_ID_HERE',
    redirectUri: 'http://localhost:4200'
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: false
  }
};

export const loginRequest = {
  scopes: ['User.Read', 'Files.ReadWrite.All']
};
