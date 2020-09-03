import { Component, OnInit, OnDestroy} from '@angular/core';
import { CompetanceService } from 'src/app/cv/services/competance.service';
import { CompetanceForm } from 'src/app/cv/model/competanceForm';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-progress-bar-backend',
  templateUrl: './progress-bar-backend.component.html',
  styleUrls: ['./progress-bar-backend.component.css']
})
export class ProgressBarBackend implements OnInit, OnDestroy {

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
