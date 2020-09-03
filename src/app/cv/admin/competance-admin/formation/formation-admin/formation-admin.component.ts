import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormationForm } from 'src/app/cv/model/formation-form';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormationService } from 'src/app/cv/services/formation.service';

@Component({
  selector: 'app-formation-admin',
  templateUrl: './formation-admin.component.html',
  styleUrls: ['./formation-admin.component.css']
})
export class FormationAdminComponent implements OnInit {

  form: FormGroup;
  private mode = 'create';
  private formationId: string;
   formationForm : FormationForm;

   constructor(public formationService: FormationService, public route: ActivatedRoute , private router: Router) { }

   onNext(){

    this.router.navigate(["/admin20072007/langue"]);
   }
   onPrecedent(){
    this.router.navigate(["/admin20072007/experience"]);
   }

 onSave(){
   if(this.form.invalid){
     return;
   }



   if(this.mode ==='create'){

       this.formationService.addFormation(
        this.form.value.date1,
        this.form.value.diplome,
        this.form.value.lieu,
        this.form.value.description,
        );



   }else{
       this.formationService.updateFormation(
       this.formationId,
       this.form.value.date1,
       this.form.value.diplome,
       this.form.value.lieu,
       this.form.value.description,
             );
       }
     this.form.reset();
   }

   ngOnInit(){

     this.form = new FormGroup({
       date1:  new FormControl(null),
       diplome:  new FormControl(null),
       lieu:  new FormControl(null),
       description:  new FormControl(null),

     });


     this.route.paramMap.subscribe((paramMap: ParamMap) => {
       if(paramMap.has('formationId')){
          this.mode = 'edit'

          this.formationId = paramMap.get('formationId');

                 this.formationService.getFormation(this.formationId).subscribe(formationData =>{

                           this.formationForm = {
                             id :formationData._id,
                             date1: formationData.date1,
                             diplome: formationData.diplome,
                             lieu: formationData.lieu,
                             description: formationData.description,
                           };

                     this.form.setValue({
                                          date1: this.formationForm.date1,
                                          diplome: this.formationForm.diplome,
                                          lieu: this.formationForm.lieu,
                                          description: this.formationForm.description,

                                         });
                  });
           }else {
             this.mode = 'create';
             this.formationId= null;
           }
    });
  }
}
