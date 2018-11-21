import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from './user.service';

/**
 * Guard use to check if the user is connected to Firebase
 */
@Injectable()
export class AuthGuard implements CanActivate {

  /**
   * constructor
   * @param userService The user service
   * @param router The router module
   */
  constructor(public userService: UserService,
              private router: Router) {
  }

  /**
   * Check if the user is logged in
   * @return a promise if the user is authenticated the promise is resolved else it's rejected
   */
  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
        .then(user => {
          this.router.navigate(['/user']);
          return resolve(false);
        }, err => {
          return resolve(true);
        });
    });
  }
}
