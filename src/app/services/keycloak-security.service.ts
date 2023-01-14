import { Injectable } from '@angular/core';
import {KeycloakInstance} from 'keycloak-js';
declare var Keycloak: any;
@Injectable({
  providedIn: 'root'
})
export class KeycloakSecurityService {
  public kc!: KeycloakInstance;
  // public keycloak: any;

  constructor() { }

  async init() {
      console.log('INIT : Service keycloak security ');
      this.kc = new Keycloak({
        url: 'http://localhost:8185/auth',
        realm: 'wallet-realm',
        clientId: 'wallet-client'
      });
    await this.kc.init({
         onLoad: 'login-required' })
       // onLoad: 'check-sso'
        // promiseType: 'native'

    /*  }).then((authenticated) => {
        // console.log('authenticated', authenticated);
        // console.log('token: ', this.keycloak.token);
        resolve({ authenticated, token: this.keycloak.token })
      }).catch(err => {
        reject(err);
      });*/
  }

  /*   public async init() {
      console.log('INIT : Service keycloak security ');
      this.keycloak = new Keycloak({
        url: 'http://localhost:8080/auth',
        realm: 'ecom-realm',
        clientId: 'keycloak-angular-app'
      });
      await this.keycloak.init({
        // onLoad: 'login-required'
        onLoad: 'check-sso'
        // promiseType: 'native'
      })
      console.log('token: ', this.keycloak.token)
    } */
}
