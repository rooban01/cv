import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CvForm } from '../../model/cv.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CvService } from '../../services/cv.service';

@Component({
  selector: 'app-cv-admin',
  templateUrl: './cv-admin.component.html',
  styleUrls: ['./cv-admin.component.css']
})
export class CvAdminComponent implements OnInit {



  form: FormGroup;
  imagePreview1: string;
  private mode = 'create';
  private cvId: string;
  cv: CvForm;

  constructor(public cvService: CvService, public route: ActivatedRoute, private router: Router )  { }


onSaveCv(){
 if(this.form.invalid){
   return;
 }

 if(this.mode ==='create'){

     this.cvService.addCv(

                this.form.value.nom,
                this.form.value.cv
               );



 }else{
   this.cvService.updateCv(
                this.cvId,
                this.form.value.nom,
                this.form.value.cv
           );
     }
   this.form.reset();
 }




 ngOnInit() {
   this.form = new FormGroup({
         nom:  new FormControl(),
         cv: new FormControl(),


   });
   this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('cvId')){
         this.mode = 'edit'

         this.cvId = paramMap.get('cvId');

         this.cvService.getCv(this.cvId).subscribe(cvData =>{

             this.cv = {

                              id : cvData._id,

                              nom: cvData.nom,
                               cvPath: cvData.cvPath,

                            };

                     this.form.setValue({

                                   nom: this.cv.nom,
                                   cv: this.cv.cvPath,


                                  });
         });
      }else {
        this.mode = 'create';
        this.cvId= null;
      }
   });
 }




onCvPicked(event: Event){

 const file = (event.target as HTMLInputElement).files[0];
 this.form.patchValue({cv: file});
 this.form.get("cv").updateValueAndValidity();
 const reader = new FileReader();
 reader.onload = () =>{
   this.imagePreview1 = <string>reader.result;
 };
 reader.readAsDataURL(file);
}

}
