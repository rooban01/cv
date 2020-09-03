import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommunForm } from 'src/app/cv/model/commun-form';
import { AtoutService } from 'src/app/cv/services/atouts.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-atouts-admin',
  templateUrl: './atouts-admin.component.html',
  styleUrls: ['./atouts-admin.component.css']
})
export class AtoutsAdminComponent implements OnInit {
  form: FormGroup;
  private mode = 'create';
  private communId: string;
   communForm : CommunForm;

   constructor(public atoutService: AtoutService, public route: ActivatedRoute , private router: Router) { }

   onNext(){

    this.router.navigate(["/admin20072007/loisir"]);
   }
   onPrecedent(){
    this.router.navigate(["/adadmin20072007min/langue"]);
   }


 onSave(){
   if(this.form.invalid){
     return;
   }



   if(this.mode ==='create'){

       this.atoutService.addAtout(
        this.form.value.titre,
        this.form.value.description,
        );



   }else{
       this.atoutService.updateAtout(
       this.communId,
       this.form.value.titre,
       this.form.value.description,
             );
       }
     this.form.reset();
   }

   ngOnInit(){

     this.form = new FormGroup({
       titre:  new FormControl(null),
       description:  new FormControl(null),

     });


     this.route.paramMap.subscribe((paramMap: ParamMap) => {
       if(paramMap.has('communId')){
          this.mode = 'edit'

          this.communId = paramMap.get('communId');

                 this.atoutService.getAtout(this.communId).subscribe(communData =>{

                           this.communForm = {
                             id :communData._id,
                             titre: communData.titre,
                             description: communData.description,
                           };

                     this.form.setValue({
                                          titre: this.communForm.titre,
                                          description: this.communForm.description,

                                         });
                  });
           }else {
             this.mode = 'create';
             this.communId= null;
           }
    });
  }
}
