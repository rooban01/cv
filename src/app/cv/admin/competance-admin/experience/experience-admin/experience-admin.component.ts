import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ExperienceForm } from 'src/app/cv/model/experience.model';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { ExperienceService } from 'src/app/cv/services/experience.service';


@Component({
  selector: 'app-experience-admin',
  templateUrl: './experience-admin.component.html',
  styleUrls: ['./experience-admin.component.css']
})
export class ExperienceAdminComponent implements OnInit {

  form: FormGroup;
  private mode = 'create';
  private experienceId: string;
  experienceForm : ExperienceForm;

   constructor(public experienceService: ExperienceService, public route: ActivatedRoute, private router: Router ) { }
   onNext(){

    this.router.navigate(["/admin20072007/formation"]);
   }
   onPrecedent(){
    this.router.navigate(["/admin20072007/electronique"]);
   }


 onSave(){
   if(this.form.invalid){
     return;
   }

   if(this.mode ==='create'){

       this.experienceService.addExperience(
        this.form.value.date1,
        this.form.value.societe,
        this.form.value.poste,
        this.form.value.description,
        );



   }else{
       this.experienceService.updateExperience(
       this.experienceId,
         this.form.value.date1,
        this.form.value.societe,
        this.form.value.poste,
        this.form.value.description,
             );
       }
     this.form.reset();
   }

   ngOnInit(){

     this.form = new FormGroup({
       date1:  new FormControl(null),
       societe:  new FormControl(null),
       poste:  new FormControl(null),
       description:  new FormControl(null),

     });


     this.route.paramMap.subscribe((paramMap: ParamMap) => {
       if(paramMap.has('experienceId')){
          this.mode = 'edit'

          this.experienceId = paramMap.get('experienceId');

                 this.experienceService.getExperience(this.experienceId).subscribe(experienceData =>{

                           this.experienceForm = {
                             id :experienceData._id,
                             date1: experienceData.date1,
                             societe: experienceData.societe,
                             poste: experienceData.poste,
                             description: experienceData.description,
                           };

                     this.form.setValue({
                                          date1: this.experienceForm.date1,
                                          societe: this.experienceForm.societe,
                                          poste: this.experienceForm.poste,
                                          description: this.experienceForm.description,

                                         });
                  });
           }else {
             this.mode = 'create';
             this.experienceId= null;
           }
    });
  }
}
