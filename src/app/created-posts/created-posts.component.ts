import {Component, OnInit} from '@angular/core';
import {GetDataService} from "../services/get-data.service";

@Component({
  selector: 'app-created-posts',
  templateUrl: './created-posts.component.html',
  styleUrls: ['./created-posts.component.css']
})
export class CreatedPostsComponent implements OnInit {
  color = 'accent';
  mode = 'determinate';
  value = 0;
  nb_homme = 0;
  nb_femme = 0;

  constructor(private getDataS: GetDataService) {
  }

  getAverageAge() {
    this.getDataS.getAverageAge((err, res) => {
      if (err) {
        console.error(err);
      }
      this.value = res;
    })
  }

  getAverageGender() {
    this.getDataS.getAverageGender((err, res) => {
      if (err) {
        console.error(err);
      }
      this.nb_homme = res.nb_homme;
      this.nb_femme = res.nb_femme;
    })
  }

  getTopPostsCreator() {
    this.getDataS.getTopPostsCreator(3, (err, res) => {
      console.log(res.users)
      if (err) {
        console.error(err);
      }
      for (let u of res.users) {

        this.getDataS.getUserById(u, (err, user) => {
          if (err) {
            return console.log(err);
          }
          console.log("get ->");
          console.log(user)
        });


      }
    })
  }


  refresh() {
    this.getAverageAge();
    this.getAverageGender();
    this.getTopPostsCreator();
  }


  ngOnInit() {
    this.refresh();
  }

}
