import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommunForm } from 'src/app/cv/model/commun-form';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LangueService } from 'src/app/cv/services/langue.service';

@Component({
  selector: 'app-langues-admin',
  templateUrl: './langues-admin.component.html',
  styleUrls: ['./langues-admin.component.css']
})
export class LanguesAdminComponent implements OnInit {
  form: FormGroup;
  private mode = 'create';
  private communId: string;
   communForm : CommunForm;

   constructor(public langueService: LangueService, public route: ActivatedRoute , private router: Router) { }

   onNext(){

    this.router.navigate(["/admin20072007/atout"]);
   }
   onPrecedent(){
    this.router.navigate(["/admin20072007/formation"]);
   }



 onSave(){
   if(this.form.invalid){
     return;
   }



   if(this.mode ==='create'){

       this.langueService.addLangue(
        this.form.value.titre,
        this.form.value.description,
        );



   }else{
       this.langueService.updateLangue(
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

                 this.langueService.getLangue(this.communId).subscribe(communData =>{

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
