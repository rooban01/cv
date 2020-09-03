import { Component, OnInit } from '@angular/core';
import { CommunForm } from 'src/app/cv/model/commun-form';
import { Subscription } from 'rxjs';
import { ElectroniqueService } from 'src/app/cv/services/electronique.service';
import { AuthService } from 'src/app/cv/services/auth.service';

@Component({
  selector: 'app-elec-display-component',
  templateUrl: './elec-display-component.html',
  styleUrls: ['./elec-display-component.css']
})
export class ElecDisplayComponent implements OnInit {

  electroniques: CommunForm []=[];
  userIsAuthenticated = false;
  userId: string;
  private contactSub : Subscription;
  private authStatusSub : Subscription;


   constructor(public electroniqueService:ElectroniqueService, private authService: AuthService){ }



    ngOnInit(){

     this.electroniqueService.getElectroniques();



      this.userId = this.authService.getUserId();
      this.contactSub = this.electroniqueService.getElectroniqueUpdatedListener()
        .subscribe((electroniques: CommunForm[]) => {
          this.electroniques=electroniques;

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
