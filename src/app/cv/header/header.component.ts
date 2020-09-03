import { Component, OnInit } from '@angular/core';
import { HeaderForm } from '../model/header-form';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HeaderService } from '../services/header.service';
import { CvForm } from '../model/cv.model';
import { CvService } from '../services/cv.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',

})
export class HeaderComponent implements OnInit {

  headers: HeaderForm []=[];
   cvs : CvForm[] = [];
  userIsAuthenticated = false;
  userId: string;
  private contactSub : Subscription;
  private cvSub : Subscription;
  private authStatusSub : Subscription;


   cvPath:string ='';
   cvNom : string ='';



   constructor(public headerService: HeaderService, private authService: AuthService, public cvService: CvService,){ }



    ngOnInit(){

      this.userId = this.authService.getUserId();
     this.headerService.getHeaders();
      this.cvService.getCvs();

     this.cvSub = this.cvService.getCvUpdatedListener()
      .subscribe((cvs: CvForm[]) => {
        this.cvs= cvs;
        const cvNom = cvs[0].nom;
        const cvPath = cvs[0].cvPath;

        this.cvPath = cvPath;
        this.cvNom = cvNom;

      });

      this.contactSub = this.headerService.getHeaderUpdatedListener()
        .subscribe((headers: HeaderForm[]) => {
          this.headers= headers;
        });

          this.userIsAuthenticated = this.authService.getIsAuth();
          this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAthenticatid =>{
          this.userIsAuthenticated = isAthenticatid;
          this.userId = this.authService.getUserId();
      });
    }

    ngOnDestroy() {
      if(this.contactSub){
          this.contactSub.unsubscribe();
      }

      this.authStatusSub.unsubscribe();
      this.cvSub.unsubscribe();
    }

    onDelete(headerId: string){
     this.headerService.deleteHeader(headerId);
    }
  }
