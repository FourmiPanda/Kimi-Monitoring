import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private afs: AngularFirestore) {
  }

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
      callback(null, value);
    }, (err) => {
      callback(err);
    });
  }


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
      const total = nb_f + nb_m;

      callback(null, {
        nb_femme: Math.floor((nb_f / total) * 100),
        nb_homme: Math.floor((nb_m / total) * 100)
      });
    }, (err) => {
      callback(err);
    });
  }


  getUserById(id, callback) {
    if (id) {
      this.afs.collection('usersInfos', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (id) { query = query.where('userId', '==', id); }
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


  getTopPostsCreator(top, callback) {
    this.afs.collection('posts').get().subscribe((posts) => {
      const map = new Map();
      const array = [];
      const array_id = new Array(top);

      for (const entry of posts.docs) {
        const entry_userId = entry.get('userId');
        if (map.has(entry_userId)) {
          let tmp = map.get(entry_userId);
          tmp++;
          map.set(entry_userId, tmp);
        } else {
          map.set(entry_userId, 1);
        }
      }
      map.forEach((v, k) => {
        array.push(v);
      });
      array.sort((n1, n2) => n2 - n1);
      for (let i = 0; i < top; i++) {
        map.forEach((v, k) => {
          if (v == array[i]) {
            array_id[i] = k;
          }
        });
      }
      callback(null, {
        users: array_id
      });
    }, (err) => {
      callback(err);
    });
  }

}
