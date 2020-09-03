import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoisirService } from 'src/app/cv/services/loisir.service';
import { AuthService } from 'src/app/cv/services/auth.service';
import { CommunForm } from 'src/app/cv/model/commun-form';

@Component({
  selector: 'app-loisir-display-component',
  templateUrl: './loisir-display-component.html',
  styleUrls: ['./loisir-display-component.css']
})
export class LoisirDisplayComponent implements OnInit {

  loisirs: CommunForm []=[];
  userIsAuthenticated = false;
  userId: string;
  private contactSub : Subscription;
  private authStatusSub : Subscription;


   constructor(public loisirService: LoisirService, private authService: AuthService){ }



    ngOnInit(){

     this.loisirService.getLoisirs();



      this.userId = this.authService.getUserId();
      this.contactSub = this.loisirService.getLoisirUpdatedListener()
        .subscribe((loisirs: CommunForm[]) => {
          this.loisirs= loisirs;

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
