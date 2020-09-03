import { Component, OnInit, ViewChild } from '@angular/core';
import { CommunForm } from 'src/app/cv/model/commun-form';
import { Subscription } from 'rxjs';
import { InformatiqueService } from 'src/app/cv/services/informatique.service';
import { AuthService } from 'src/app/cv/services/auth.service';



@Component({
  selector: 'app-info-display-component',
  templateUrl: './info-display-component.html',
  styleUrls: ['./info-display-component.css']
})
export class InfoDisplayComponent implements OnInit {

  informatiques: CommunForm []=[];
  userIsAuthenticated = false;
  userId: string;
  private contactSub : Subscription;
  private authStatusSub : Subscription;



   constructor(public informatiqueService:InformatiqueService, private authService: AuthService){ }



    ngOnInit(){

     this.informatiqueService.getInformatiques();



      this.userId = this.authService.getUserId();
      this.contactSub = this.informatiqueService.getInformatiqueUpdatedListener()
        .subscribe((informatiques: CommunForm[]) => {
          this.informatiques=informatiques;

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
