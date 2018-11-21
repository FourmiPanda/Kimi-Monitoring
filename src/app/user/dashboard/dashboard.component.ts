import {Component, OnInit} from '@angular/core';
import {GetDataService} from '../../services/get-data.service';

/**
 * The dashboard component
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  /**
   * constructor
   * @param getDataService the GetDataService
   */
  constructor(private getDataService: GetDataService) {
  }

  ngOnInit() {
    this._test();
  }

  /**
   * Run tests and print the result on the console
   */
  _test() {
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
    this.getDataService.getZoneByDocId('5E6lc4iv7Z1LSQuA6O0u', (err, res) => {
      console.log('Test getZoneByDocId ->');
      if (err) {
        return console.error(err);
      }
      console.log(res);
    });
    this.getDataService.getResponseOfADiag('Et52rT5p5eUC2xidvYoV', (err, res) => {
      console.log('Test getResponseOfADiag ->');
      if (err) {
        return console.error(err);
      }
      console.log(res);
    });
    this.getDataService.getDiagnosticsOfAZone('5E6lc4iv7Z1LSQuA6O0u', (err, res) => {
      console.log('Test getDiagnosticsOfAZone ->');
      if (err) {
        return console.error(err);
      }
      console.log(res);
    }, +new Date('December 17, 2018 03:24:00'), Date.now());
    this.getDataService.getPostsOfAUser('dhaXX2isz3fbXES0Vl9JszmXGY32', (err, res) => {
      console.log('Test getPostsOfAUser ->');
      if (err) {
        return console.error(err);
      }
      console.log(res);
    }, Date.now());
  }

}
