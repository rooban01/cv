import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit {

  @Output()
  closeSidenav = new EventEmitter <void>();
  @Output()
  sidenavToggle = new EventEmitter<void>();
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(private authService: AuthService) {

  }



  ngOnInit(){
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe( isAutheticated => {
      this.userIsAuthenticated = isAutheticated;
    });
  }

  ngOnDestroy(){
     this.authListenerSubs.unsubscribe();
  }

  onToggleSidenav(){
    this.sidenavToggle.emit();
}

  onClose(){
    this.closeSidenav.emit();
  }

  onLogout(){
 this.onClose();
 this.authService.logout();
}

}
