import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar.admin.component.html',
  styleUrls: ['./navbar.admin.component.css']
})
export class NavbarAdminComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authservice: AuthService) { }

  onLogout(){
    this.authservice.logout();
  }

  ngOnInit(){
    this.userIsAuthenticated = this.authservice.getIsAuth();
    this.authListenerSubs = this.authservice.getAuthStatusListener().subscribe( isAutheticated => {
      this.userIsAuthenticated = isAutheticated;
    });
  }

  ngOnDestroy(){
     this.authListenerSubs.unsubscribe();
  }





}
