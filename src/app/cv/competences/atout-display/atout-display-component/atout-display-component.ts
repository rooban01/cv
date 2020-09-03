import { Component, OnInit } from '@angular/core';
import { CommunForm } from 'src/app/cv/model/commun-form';
import { AtoutService } from 'src/app/cv/services/atouts.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/cv/services/auth.service';

@Component({
  selector: 'app-atout-display-component',
  templateUrl: './atout-display-component.html',
  styleUrls: ['./atout-display-component.css']
})
export class AtoutDisplayComponent implements OnInit {

 atouts: CommunForm []=[];
  userIsAuthenticated = false;
  userId: string;
  private contactSub : Subscription;
  private authStatusSub : Subscription;


   constructor(public atoutService:AtoutService, private authService: AuthService){ }



    ngOnInit(){

     this.atoutService.getAtouts();



      this.userId = this.authService.getUserId();
      this.contactSub = this.atoutService.getAtoutUpdatedListener()
        .subscribe((atouts: CommunForm[]) => {
          this.atouts=atouts;

        });

        this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAthenticatid =>{
          this.userIsAuthenticated = isAthenticatid;
          this.userId = this.authService.getUserId();
      });
    }

    ngOnDestroy() {
      this.contactSub.unsubscribe();
      this.authStatusSub.unsubscribe();
    }


  }
