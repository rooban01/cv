import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommunForm } from 'src/app/cv/model/commun-form';
import { ElectroniqueService } from 'src/app/cv/services/electronique.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-elec-admin',
  templateUrl: './elec-admin.component.html',
  styleUrls: ['./elec-admin.component.css']
})
export class ElecAdminComponent implements OnInit {
  form: FormGroup;
  private mode = 'create';
  private communId: string;
   communForm : CommunForm;

   constructor(public electroniqueService: ElectroniqueService, public route: ActivatedRoute, private router:Router ) { }
   onNext(){

    this.router.navigate(["/admin20072007/experience"]);
   }
   onPrecedent(){
    this.router.navigate(["/admin20072007/informatique"]);
   }

 onSave(){
   if(this.form.invalid){
     return;
   }



   if(this.mode ==='create'){

       this.electroniqueService.addElectronique(
        this.form.value.titre,
        this.form.value.description,
        );



   }else{
       this.electroniqueService.updateElectronique(
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

                 this.electroniqueService.getElectronique(this.communId).subscribe(communData =>{

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

