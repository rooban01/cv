import { Component, OnInit } from '@angular/core';
import { CommunForm } from 'src/app/cv/model/commun-form';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/cv/services/auth.service';
import { LangueService } from 'src/app/cv/services/langue.service';

@Component({
  selector: 'app-langue-display-component',
  templateUrl: './langue-display-component.html',
  styleUrls: ['./langue-display-component.css']
})
export class LangueDisplayComponent implements OnInit {

  langues: CommunForm []=[];
  userIsAuthenticated = false;
  userId: string;
  private contactSub : Subscription;
  private authStatusSub : Subscription;


   constructor(public langueService: LangueService, private authService: AuthService){ }



    ngOnInit(){

     this.langueService.getLangues();



      this.userId = this.authService.getUserId();
      this.contactSub = this.langueService.getLangueUpdatedListener()
        .subscribe((langues: CommunForm[]) => {
          this.langues= langues;

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
