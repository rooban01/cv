import { Component, OnInit, OnDestroy} from '@angular/core';
import { CompetanceService } from 'src/app/cv/services/competance.service';
import { CompetanceForm } from 'src/app/cv/model/competanceForm';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-progress-bar-frontend',
  templateUrl: './progress-bar-frontend.component.html',
  styleUrls: ['./progress-bar-frontend.component.css']
})
export class ProgressBarFrontend implements OnInit, OnDestroy {

  competances: CompetanceForm []=[];
  private competanceSub : Subscription;

  constructor(private competanceService: CompetanceService){}

 ngOnInit() {

  this.competanceService.getCompetances();
  this.competanceSub = this.competanceService.getCompetanceUpdatedListener()
    .subscribe((competances: CompetanceForm[]) => {
      this.competances= competances;

    });
 }

 ngOnDestroy(){
   this.competanceSub.unsubscribe();
}



 }
