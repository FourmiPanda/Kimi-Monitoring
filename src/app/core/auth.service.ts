import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/**
 * Service use to authenticate a user to Firebase
 */
@Injectable()
export class AuthService {

  /**
   * constructor
   * @param afAuth The authentication module
   */
  constructor(public afAuth: AngularFireAuth) {
  }

  /**
   * Try to authenticate the user with a Facebook account
   * @return a promise if the user successfully authenticated it's resolved, if not it's rejected
   */
  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  /**
   * Try to authenticate the user with a Twitter account
   * @return a promise if the user successfully authenticated it's resolved, if not it's rejected
   */
  doTwitterLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }


  /**
   * Try to authenticate the user with a Google account
   * @return a promise if the user successfully authenticated it's resolved, if not it's rejected
   */
  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  /**
   * Try to log out the user
   * @return a promise if the user successfully logged out it's resolved, if not it's rejected
   */
  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }


}
