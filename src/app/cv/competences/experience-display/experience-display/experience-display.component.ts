import { Component, OnInit } from '@angular/core';
import { ExperienceForm } from 'src/app/cv/model/experience.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/cv/services/auth.service';
import { ExperienceService } from 'src/app/cv/services/experience.service';

@Component({
  selector: 'app-experience-display',
  templateUrl: './experience-display.component.html',
  styleUrls: ['./experience-display.component.css']
})
export class ExperienceDisplayComponent implements OnInit {

  experiences: ExperienceForm []=[];
  userIsAuthenticated = false;
  userId: string;
  private contactSub : Subscription;
  private authStatusSub : Subscription;


   constructor(public experienceService: ExperienceService, private authService: AuthService){ }



    ngOnInit(){

     this.experienceService.getExperiences();



      this.userId = this.authService.getUserId();
      this.contactSub = this.experienceService.getExperienceUpdatedListener()
        .subscribe((experiences: ExperienceForm[]) => {
          this.experiences= experiences;

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
