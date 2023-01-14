
import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
  return (): Promise<any> =>
    keycloak.init({
      config: {
        url: 'http://localhost:8185/auth',
        realm: 'wallet-realm',
        clientId: 'wallet-client',
      },
      initOptions: {
        onLoad:'check-sso',
        checkLoginIframe: true,
        checkLoginIframeInterval: 25
      },
      loadUserProfileAtStartUp: false
    });
}
