import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CompetanceService } from 'src/app/cv/services/competance.service';
import { CompetanceForm } from 'src/app/cv/model/competanceForm';

@Component({
  selector: 'app-informatique-admin',
  templateUrl: './informatique.admin.component.html',
  styleUrls: ['./informatique.admin.component.css']
})
export class InformatiqueAdminComponent implements OnInit {


  formCompetance: FormGroup;
 private mode = 'create';
 private competanceId: string;
 competance: CompetanceForm;

  constructor(public competanceService: CompetanceService, public route: ActivatedRoute, private router: Router ) { }

  onNext(){

    this.router.navigate(["/admin20072007/electronique"]);
   }
   onPrecedent(){
    this.router.navigate(["/admin20072007/portfolio"]);
   }



onSaveCompetance(){
  if(this.formCompetance.invalid){
    return;
  }

  if(this.mode ==='create'){
      this.competanceService.addCompetance(
          this.formCompetance.value.sujet,
        this.formCompetance.value.niveau,
          this.formCompetance.value.commentaire,

       );



  }else{
    this.competanceService.updateCompetance(
      this.competanceId,
      this.formCompetance.value.sujet,
      this.formCompetance.value.niveau,
      this.formCompetance.value.commentaire
            );
      }
    this.formCompetance.reset();

  }

  ngOnInit(){

    this.formCompetance = new FormGroup({
      sujet:  new FormControl(null),
      niveau: new FormControl(0),
      commentaire: new FormControl(null),
    });


    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('competanceId')){
         this.mode = 'edit'

         this.competanceId = paramMap.get('competanceId');

                this.competanceService.getCompetance(this.competanceId).subscribe(competanceData =>{

                    this.competance = {
                                        id :competanceData._id,
                                        sujet:competanceData.sujet,
                                        niveau : competanceData.niveau,
                                        commentaire:competanceData.commentaire
                                      };

                    this.formCompetance.setValue({
                                         sujet: this.competance.sujet,
                                         niveau : competanceData.niveau,
                                         commentaire: this.competance.sujet
                                        });
                 });
          }else {
            this.mode = 'create';
            this.competanceId= null;
          }
   });
 }
}
