import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";

@Component({
  selector: 'app-created-posts',
  templateUrl: './created-posts.component.html',
  styleUrls: ['./created-posts.component.css']
})
export class CreatedPostsComponent implements OnInit {
  color = 'primary';
  mode = 'determinate';
  value = 0;

  constructor(private afs: AngularFirestore) { }

  getNbPost(){
    this.afs.collection("usersInfos").get().subscribe((posts)=> {
      let total_age = 0;
      let nb = 0;
      for (let entry of posts.docs) {
        let entry_age = entry.get("age");
        total_age =  total_age + entry_age;
        nb++;
      }
      this.value = total_age/nb
    },(err) => {
      console.error(err);
    });
  }

  ngOnInit() {
    this.getNbPost()
  }

}
