import { Component, OnInit } from '@angular/core';
import { LoisirService } from 'src/app/cv/services/loisir.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { CommunForm } from 'src/app/cv/model/commun-form';

@Component({
  selector: 'app-loisir-admin',
  templateUrl: './loisir-admin.component.html',
  styleUrls: ['./loisir-admin.component.css']
})
export class LoisirAdminComponent implements OnInit {
  form: FormGroup;
  private mode = 'create';
  private communId: string;
   communForm : CommunForm;

   constructor(public loisirService: LoisirService, public route: ActivatedRoute , private router: Router) { }

   onPrecedent(){
    this.router.navigate(["/admin20072007/atout"]);
   }


 onSave(){
   if(this.form.invalid){
     return;
   }



   if(this.mode ==='create'){

       this.loisirService.addLoisir(
        this.form.value.titre,
        this.form.value.description,
        );



   }else{
       this.loisirService.updateLoisir(
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

                 this.loisirService.getLoisir(this.communId).subscribe(communData =>{

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
