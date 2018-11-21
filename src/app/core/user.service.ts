import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

/**
 * Service use to get a user from the database
 */
@Injectable()
export class UserService {

  /**
   * Get the current user
   * @param db AngulareFirestore module used for querying the cloud firestore DB
   */
  constructor(public db: AngularFirestore) {
  }

  /**
   * Get the current user
   * @return a promise if the user is authenticated the promise is resolved else it's rejected
   */
  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }
}
