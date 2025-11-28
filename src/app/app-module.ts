import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MsalModule, MsalInterceptor, MsalService } from '@azure/msal-angular';
import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType
} from '@azure/msal-browser';

import { msalConfig, loginRequest } from './auth.config';
import { App } from './app';

// ✅ MSAL Instance Factory
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    HttpClientModule,

    // ✅ THIS IS THE FIX FOR router-outlet ERROR
    RouterModule.forRoot([]),

    // ✅ MSAL CONFIG
    MsalModule.forRoot(
      MSALInstanceFactory(),
      {
        interactionType: InteractionType.Popup,
        authRequest: loginRequest
      },
      {
        interactionType: InteractionType.Popup,
        protectedResourceMap: new Map([
          ['https://graph.microsoft.com/v1.0/', ['User.Read', 'Files.ReadWrite.All']]
        ])
      }
    )
  ],
  providers: [
    MsalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [App]
})
export class AppModule {}
