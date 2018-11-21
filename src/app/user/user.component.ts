import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {FirebaseUserModel} from '../core/user.model';

/**
 * The User component
 */
@Component({
  selector: 'page-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.scss']
})

export class UserComponent implements OnInit {

  /**
   * This attribute represent the authenticated user
   */
  user: FirebaseUserModel = new FirebaseUserModel();

  /**
   * constructor
   * @param authService The authentication service
   * @param route The Router module
   * @param location The Location module
   */
  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location) {

  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.user = data;
      }
    });
  }


  /**
   * Disconnected the user
   */
  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.location.back();
      }, (error) => {
        console.log('Logout error', error);
      });
  }
}
