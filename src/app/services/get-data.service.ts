import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private afs: AngularFirestore) { }

  getAverageAge(callback){
    this.afs.collection("usersInfos").get().subscribe((users)=> {
      let total_age = 0;
      let nb = 0;
      let value;
      for (let entry of users.docs) {
        let entry_age = entry.get("age");
        total_age =  total_age + entry_age;
        nb++;
      }
      value = total_age/nb;
      callback(null,value)
    },(err) => {
      callback(err);
    });
  }

  getAverageGender(callback){
    this.afs.collection("usersInfos").get().subscribe((users)=> {
      let nb_f = 0;
      let nb_m = 0;
      for (let entry of users.docs) {
        let entry_gender = entry.get("sexe");
        if(entry_gender == "homme"){
          nb_m++;
        }
        if(entry_gender == "femme"){
          nb_f++;
        }
      }
      let total = nb_f+nb_m;

      callback(null,{
        nb_femme: Math.floor((nb_f/total)*100),
        nb_homme: Math.floor((nb_m/total)*100)
      });
    },(err) => {
      callback(err);
    });
  }


}
