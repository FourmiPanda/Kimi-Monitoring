import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {rootRouterConfig} from './app.routes';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {environment} from '../environments/environment';
import {UserResolver} from './user/user.resolver';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AuthService} from './core/auth.service';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AngularFireModule} from 'angularfire2';
import {MatIconModule} from '@angular/material/icon';
import {AuthGuard} from './core/auth.guard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {BrowserModule} from '@angular/platform-browser';
import {UserService} from './core/user.service';
import {APP_BASE_HREF} from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoginComponent,
        UserComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        ReactiveFormsModule,
        RouterModule.forRoot(rootRouterConfig, { useHash: false }),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features
      ],
      providers: [AuthService, UserService, UserResolver, AuthGuard, {provide: APP_BASE_HREF, useValue: '/'}]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
