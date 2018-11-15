import {TestBed} from '@angular/core/testing';

import {GetDataService} from './get-data.service';
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {environment} from "../../environments/environment";


describe('GetDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    ],
    providers: [AngularFirestore]
  }));

  it('should be created', () => {
    const service: GetDataService = TestBed.get(GetDataService);
    expect(service).toBeTruthy();
  });

  it('should get average age', (done: DoneFn) => {
    console.log('GET AVERAGE AGE');
    const service: GetDataService = TestBed.get(GetDataService);
    // TODO: Real test
    service.getAverageAge((err, res) => {
      console.log('CALLBACK');
      console.log(err);
      expect(err).toBe('null');
      done();
    });
  });


});
