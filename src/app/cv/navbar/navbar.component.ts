import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Output()
  sidenavToggle = new EventEmitter<void>();

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

  onToggleSidenav(){
    this.sidenavToggle.emit();
}



}
