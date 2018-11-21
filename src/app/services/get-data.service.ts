import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFirestore} from '@angular/fire/firestore';

/**
 * GetDataService is used for interacting with the database
 */
@Injectable({
  providedIn: 'root'
})

export class GetDataService {

  /**
   * constructor
   * @param afs AngulareFirestore module used for querying the cloud firestore DB
   * @param afd AngularFireDatabase module used for querying the Real Time DB
   */
  constructor(private afs: AngularFirestore, private afd: AngularFireDatabase) {
  }

  /**
   * Get a number of the users average age
   * @param callback  The first parameter of the callback is the error, the second is the value
   */
  getAverageAge(callback) {
    this.afs.collection('usersInfos').get().subscribe((users) => {
      let total_age = 0;
      let nb = 0;
      let value;
      for (const entry of users.docs) {
        const entry_age = entry.get('age');
        total_age = total_age + entry_age;
        nb++;
      }
      value = total_age / nb;
      return callback(null, value);
    }, (err) => {
      return callback(err);
    });
  }

  /**
   * Get an object with 2 attributes, nb_femme & nb_homme, respectively the number of woman and the number of man
   * @param callback  The first parameter of the callback is the error, the second is the value
   */
  getAverageGender(callback) {
    this.afs.collection('usersInfos').get().subscribe((users) => {
      let nb_f = 0;
      let nb_m = 0;
      for (const entry of users.docs) {
        const entry_gender = entry.get('sexe');
        if (entry_gender === 'homme') {
          nb_m++;
        }
        if (entry_gender === 'femme') {
          nb_f++;
        }
      }
      callback(null, {
        nb_femme: nb_f,
        nb_homme: nb_m
      });
    }, (err) => {
      callback(err);
    });
  }

  /**
   * Get a user by it's id
   * @param id The id of the user to get
   * @param callback The first parameter of the callback is the error, the second is the value
   */
  getUserById(id: string, callback) {
    if (id) {
      this.afs.collection('usersInfos', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        query = query.where('userId', '==', id);
        query = query.limit(1);
        return query;
      }).valueChanges().subscribe((user) => {
        return callback(null, user);
      }, (err) => {
        return callback(err);
      });
    } else {
      callback(new Error('no id'));
    }
  }

  /**
   * Get a post by it's document id
   * @param id The id of the post (document) to get
   * @param callback The first parameter of the callback is the error, the second is the value
   */
  getPostById(id: string, callback) {
    if (id) {
      this.afs.collection('posts').doc(id).valueChanges().subscribe((post) => {
        return callback(null, post);
      }, (err) => {
        return callback(err);
      });
    } else {
      callback(new Error('no id'));
    }
  }

  getImages(callback) {
    this.afs.collection('image').get().subscribe((images) => {

      let array: string[] = [];

      for (const entry of images.docs) {
        array.push(entry.get("url"));
      }

      return callback(null, array);
    }, (err) => {
      return callback(err);
    });
  }

  /**
   * Get a map of the users as the key and the number of diagnostics send as the value
   * @param callback The first parameter of the callback is the error, the second is the value
   */
  getMostDiagnosticsUsers(callback) {
    this.afs.collection('diagnostics').get().subscribe((users) => {
      let classement = new Map<string, number>();

      for (const entry of users.docs) {
        classement = this._addUserToMap(entry.get('userId'), classement);
      }

      callback(null, classement);
    }, (err) => {
      callback(err);
    });
  }

  /**
   * Get a map of the users as the key and the number of posts created as the value
   * @param callback The first parameter of the callback is the error, the second is the value
   */
  getMostPostsUsers(callback) {
    this.afs.collection('posts').get().subscribe((users) => {
      let classement = new Map<string, number>();
      for (const entry of users.docs) {
        classement = this._addUserToMap(entry.get('userId'), classement);
      }
      callback(null, classement);
    }, (err) => {
      callback(err);
    });
  }


  /**
   * Get upvotes as an object, each attributes represent a 'zones' document's id and each document have attributes
   * that represent userId and the number of upvotes as their value
   * @param callback callback
   */
  getMostUpvotes(callback) {
    this.afd.object('upvotes').valueChanges().subscribe((res) => {
      callback(null, res);
    }, (err) => {
      callback(err);
    });
  }


  /**
   * Add a key to a map if the key is already there increment it's value by 1
   * @param value The value to add
   * @param map The map where the value is added
   * @return the map with the added value
   */
  private _addUserToMap(value: string, map: Map<string, number>): Map<string, number> {
    if (map.has(value)) {
      return map.set(value, map.get(value) + 1);
    }
    return map.set(value, 1);
  }


}
