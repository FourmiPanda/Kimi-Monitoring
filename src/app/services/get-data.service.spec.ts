import {TestBed} from '@angular/core/testing';

import {GetDataService} from './get-data.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {environment} from '../../environments/environment';


describe('GetDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      AngularFireAuthModule,
    ],
    providers: [AngularFirestore]
  }));

  it('should be created', () => {
    const service: GetDataService = TestBed.get(GetDataService);
    expect(service).toBeTruthy();
  });

  it('should get average age', () => {

  });


});
