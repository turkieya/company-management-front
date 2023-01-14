import { Component } from '@angular/core';
import {SecurityService} from "./services/security.service";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'company-managment-frontend';
  constructor(private keycloakService: KeycloakService,public  securityService:SecurityService) {
    /*const keycloakAuth: any = {
      url: 'http://localhost:8185/auth',
      realm: 'wallet-realm',
      clientId: 'wallet-client',
      clientSecret: 'yioxRoXTUuCkxetGD31GxtpDyqToFjFB',
    };
    this.keycloakService
      .init({ config: keycloakAuth, initOptions: { onLoad: 'check-sso' } })
      .then((authenticated) => {
        console.log('Authenticated', authenticated);
      })
      .catch((error) => console.error(error));*/
  }


  async login() {
    await this.securityService.kcService.login({
      redirectUri:window.location.origin
    })
  }

  onLogout() {

  }
}
