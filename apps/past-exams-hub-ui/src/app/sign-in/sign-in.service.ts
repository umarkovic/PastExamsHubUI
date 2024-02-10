import { Injectable, inject } from '@angular/core';
import {
  AuthenticationService,
  PastExamsHubAuthorityApplicationAuthenticationCommandsSignInSignInCommand,
} from '@org/authority/data-access';

@Injectable()
export class SignInService {
  // private authenticationService = inject(AuthenticationService);

  signIn(
    formData: {
      email: string | undefined;
      password: string | undefined;
    },
    returnUrl: string
  ) {
    const command: PastExamsHubAuthorityApplicationAuthenticationCommandsSignInSignInCommand =
      {
        email: formData.email,
        password: formData.password,
        rememberMe: false,
        returnUrl,
      };
    // return this.authenticationService.authenticationSignInPost(command);
  }
}
