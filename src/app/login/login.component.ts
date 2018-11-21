import {Component} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {Router} from '@angular/router';

/**
 * The login component
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})
export class LoginComponent {

  /**
   * constructor
   * @param authService The Authentication service
   * @param router The router module
   */
  constructor(public authService: AuthService,
              private router: Router) {
  }

  /**
   * Try to authenticate the user with a Facebook account
   */
  tryFacebookLogin() {
    this.authService.doFacebookLogin()
      .then(res => {
        this.router.navigate(['/user']);
      });
  }

  /**
   * Try to authenticate the user with a Twitter account
   */
  tryTwitterLogin() {
    this.authService.doTwitterLogin()
      .then(res => {
        this.router.navigate(['/user']);
      });
  }

  /**
   * Try to authenticate the user with a Google account
   */
  tryGoogleLogin() {
    this.authService.doGoogleLogin()
      .then(res => {
        this.router.navigate(['/user']);
      });
  }
}
