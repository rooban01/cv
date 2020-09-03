import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/cv/services/auth.service';
import { FormationService } from 'src/app/cv/services/formation.service';
import { Subscription } from 'rxjs';
import { FormationForm } from 'src/app/cv/model/formation-form';

@Component({
  selector: 'app-formation-display-component',
  templateUrl: './formation-display-component.html',
  styleUrls: ['./formation-display-component.css']
})
export class FormationDisplayComponent implements OnInit {

  formations: FormationForm []=[];
  userIsAuthenticated = false;
  userId: string;
  private contactSub : Subscription;
  private authStatusSub : Subscription;


   constructor(public formationService: FormationService, private authService: AuthService){ }



    ngOnInit(){

     this.formationService.getFormations();



      this.userId = this.authService.getUserId();
      this.contactSub = this.formationService.getFormationUpdatedListener()
        .subscribe((formations: FormationForm[]) => {
          this.formations= formations;

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
