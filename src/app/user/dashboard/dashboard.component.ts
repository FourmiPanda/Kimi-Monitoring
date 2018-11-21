import {Component, OnInit} from '@angular/core';
import {GetDataService} from '../../services/get-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor(private getDataService: GetDataService) {
    }

  ngOnInit() {
    this.test();
  }

  test(){
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
    this.getDataService.getUserById('dhaXX2isz3fbXES0Vl9JszmXGY32', (err, res) => {
      console.log('Test getUserById ->');
      if (err) {
        return console.error(err);
      }
      console.log(res);
    });
    this.getDataService.getPostById('3ERbnaH2XzU8B3JI2si8', (err, res) => {
      console.log('Test getPostById ->');
      if (err) {
        return console.error(err);
      }
      console.log(res);
    });
    this.getDataService.getMostPostsUsers((err, res) => {
      console.log('Test getMostPostsUsers ->');
      if (err) {
        return console.error(err);
      }
      console.log(res);
    });
    this.getDataService.getMostDiagnosticsUsers((err, res) => {
      console.log('Test getMostDiagnosticsUsers ->');
      if (err) {
        return console.error(err);
      }
      console.log(res);
    });
    this.getDataService.getMostUpvotes((err, res) => {
      console.log('Test getMostUpvotes ->');
      if (err) {
        return console.error(err);
      }
      console.log(res);
    });
  }

}
