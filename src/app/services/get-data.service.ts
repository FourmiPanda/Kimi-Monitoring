import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFirestore} from '@angular/fire/firestore';

/**
 * GetDataService is used for interacting with the database
 * The different method use the angularfire2 api, that's why every
 * element you get are Observable. It means that the value of the element
 * can change over time.
 */
@Injectable({
  providedIn: 'root'
})

export class GetDataService {

  /**
   * The 'usersInfo' collection
   */
  private col_usersInfo = null;

  /**
   * The 'posts' collection
   */
  private col_posts = null;

  /**
   * The 'zones' collection
   */
  private col_zones = null;

  /**
   * The 'diagnostics' collection
   */
  private col_diagnostics = null;

  /**
   * The 'upvote' collection
   */
  private col_upvotes = null;

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
    if (this.col_usersInfo == null) {
      this.col_usersInfo = this.afs.collection('usersInfos');
    }
    this.col_usersInfo.get().subscribe((users) => {
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
    if (this.col_usersInfo == null) {
      this.col_usersInfo = this.afs.collection('usersInfos');
    }
    this.col_usersInfo.get().subscribe((users) => {
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
   * Get a zone by it's doc id
   * @param id The id of the document
   * @param callback The first parameter of the callback is the error, the second is the value
   */
  getZoneByDocId(id: string, callback) {
    if (id) {
      if (this.col_zones == null) {
        this.col_zones = this.afs.collection('zones');
      }
      this.col_zones.doc(id).valueChanges().subscribe((post) => {
        return callback(null, post);
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
      if (this.col_posts == null) {
        this.col_posts = this.afs.collection('posts');
      }
      this.col_posts.doc(id).valueChanges().subscribe((post) => {
        return callback(null, post);
      }, (err) => {
        return callback(err);
      });
    } else {
      callback(new Error('no id'));
    }
  }

  /**
   * Get a map of the users as the key and the number of diagnostics send as the value
   * @param callback The first parameter of the callback is the error, the second is the value
   */
  getMostDiagnosticsUsers(callback) {
    if (this.col_diagnostics == null) {
      this.col_diagnostics = this.afs.collection('diagnostics');
    }
    this.col_diagnostics.get().subscribe((users) => {
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
    if (this.col_posts == null) {
      this.col_posts = this.afs.collection('posts');
    }
    this.col_posts.get().subscribe((users) => {
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
   * Get an array of the post created by the given user
   * @param id The id of the user
   * @param callback The first parameter of the callback is the error, the second is the value
   * @param start_date Optional : select only the post created since this parameter
   * @param end_date Optional : select only the post created before this parameter
   */
  getPostsOfAUser(id: string, callback, start_date?, end_date?) {
    if (id) {
      this.afs.collection('posts', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        query = query.where('userId', '==', id);
        query = query.orderBy('published', 'desc');
        // FIXME: Bug with date
        if (start_date) {
          query = query.startAt(start_date);
        }
        if (end_date) {
          query = query.endAt(end_date);
        }
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
   * Get an array of the diagnostic of a given zone
   * @param id The id of the user
   * @param callback The first parameter of the callback is the error, the second is the value
   * @param start_date Optional : select only the post created since this parameter
   * @param end_date Optional : select only the post created before this parameter
   */
  getDiagnosticsOfAZone(id: string, callback, start_date?, end_date?) {
    if (id) {
      this.afs.collection('diagnostics', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        query = query.where('zoneId', '==', id);
        query = query.orderBy('published');
        // FIXME: Bug with date
        if (start_date) {
          query = query.startAt(start_date);
        }
        if (end_date) {
          query = query.endAt(end_date);
        }
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
   * Get an array of the response of a given diagnostic
   * @param id The id of the user
   * @param callback The first parameter of the callback is the error, the second is the value
   */
  getResponseOfADiag(id: string, callback) {
    if (id) {
      this.afs.collection('responses', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        query = query.where('diagId', '==', id);
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
   * Get upvotes as an object, each attributes represent a 'zones' document's id and each document have attributes
   * that represent userId and the number of upvotes as their value
   * @param callback callback
   */
  getMostUpvotes(callback) {
    if (this.col_upvotes == null) {
      this.col_upvotes = this.afd.object('upvotes');
    }
    this.col_upvotes.valueChanges().subscribe((res) => {
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
