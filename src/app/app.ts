import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  isLoggedIn = false;

  constructor(
    private msal: MsalService,
    private http: HttpClient
  ) {
    this.isLoggedIn = this.msal.instance.getAllAccounts().length > 0;
  }

  login() {
    this.msal.loginPopup().subscribe(() => {
      this.isLoggedIn = true;
    });
  }

  logout() {
    this.msal.logoutPopup();
    this.isLoggedIn = false;
  }

  openWordDocument() {
    this.http
      .get<{ url: string }>('http://localhost:3000/api/word-link')
      .subscribe(res => {
        window.open(res.url, '_blank');
      });
  }
}
