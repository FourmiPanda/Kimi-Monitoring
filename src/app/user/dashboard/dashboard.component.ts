import { Component, OnInit } from '@angular/core';
import {GetDataService} from '../../services/get-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private getDataService: GetDataService) { }

  ngOnInit() {
    console.log('Tests :');
    this.getDataService.getAverageAge((err, res) => {
      console.log('Test getDataService ->');
      if (err) {
        return console.error(err);
      }
      console.log(res);
    });
    this.getDataService.getAverageGender((err, res) => {
      console.log('Test getAverageGender ->');
      if (err) {
        return console.error(err);
      }
      console.log(res);
    });
    this.getDataService.getUserById('YZ40aAkesnQdEf5zHwQUOdGbDHJ3', (err, res) => {
      console.log('Test getUserById ->');
      if (err) {
        return console.error(err);
      }
      console.log(res);
    });
    this.getDataService.getMostPostsUsers( (err, res) => {
      console.log('Test getMostPostsUsers ->');
      if (err) {
        return console.error(err);
      }
      console.log(res);
    });
    this.getDataService.getMostDiagnosticsUsers( (err, res) => {
      console.log('Test getMostDiagnosticsUsers ->');
      if (err) {
        return console.error(err);
      }
      console.log(res);
    });

  }

}