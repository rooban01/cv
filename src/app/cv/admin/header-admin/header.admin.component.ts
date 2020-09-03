import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HeaderForm } from '../../model/header-form';
import { mimeType } from '../../contact/mime-type.validator';
import { HeaderService } from '../../services/header.service';




@Component({
  selector: 'app-header-admin-component',
  templateUrl: './header.admin.component.html',
  styleUrls: ['./header.admin.component.css']
})
export class  HeaderAdminComponent implements OnInit {


   isLoading = false;
   form: FormGroup;
   imagePreview: string;
   imagePreview1: string;
   private mode = 'create';
   private headerId: string;
   header: HeaderForm;

   constructor(public headerService: HeaderService, public route: ActivatedRoute, private router: Router )  { }

   onNext(){

    this.router.navigate(["/admin20072007/moi"]);
   }

onSaveHeader(){
  if(this.form.invalid){
    console.log("nom")
    return;
  }

  if(this.mode ==='create'){
      //this.contactCreated.emit(contact);
      this.headerService.addHeader(
                 this.form.value.gender,
                 this.form.value.nom,
                 this.form.value.prenom,
                 this.form.value.numero,
                 this.form.value.rue,
                 this.form.value.complementaire,
                 this.form.value.code,
                 this.form.value.commune,
                 this.form.value.telephone,
                 this.form.value.email,
                 this.form.value.titre,
                 this.form.value.phrase,
                 this.form.value.image,
              //   this.form.value.cv
                );



  }else{
    this.headerService.updateHeader(
                 this.headerId,
                 this.form.value.gender,
                 this.form.value.nom,
                 this.form.value.prenom,
                 this.form.value.numero,
                 this.form.value.rue,
                 this.form.value.complementaire,
                 this.form.value.code,
                 this.form.value.commune,
                 this.form.value.telephone,
                 this.form.value.email,
                 this.form.value.titre,
                 this.form.value.phrase,
                 this.form.value.image,
               //  this.form.value.cv
            );
      }
    this.form.reset();
  }




  ngOnInit() {
    this.form = new FormGroup({
          nom:  new FormControl(null, { validators: [Validators.required, Validators.minLength(2)]}),
          prenom: new FormControl(null),
          numero: new FormControl(null),
          rue: new FormControl(null),
          complementaire: new FormControl(null),
          code: new FormControl(null),
          commune: new FormControl(null),
          telephone: new FormControl(null),
          email: new FormControl(null),
          titre: new FormControl(null),
          phrase: new FormControl(null),
          image: new FormControl(null, {validators: [Validators.required],asyncValidators: [mimeType]}),
          gender: new FormControl(null),
         // cv: new FormControl(),


    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
       if(paramMap.has('headerId')){
          this.mode = 'edit'

          this.headerId = paramMap.get('headerId');

          this.headerService.getHeader(this.headerId).subscribe(headerData =>{

              this.header = {

                               id : headerData._id,
                               gender: headerData.gender,
                               nom: headerData.nom,
                               prenom: headerData.prenom,
                               numero: headerData.numero,
                               rue: headerData.rue,
                               complementaire: headerData.commune,
                               code: headerData.code,
                               commune: headerData.commune,
                               telephone: headerData.telephone,
                               email: headerData.email,
                               titre: headerData.titre,
                               phrase: headerData.phrase,
                           //    cvPath: headerData.cvPath,
                               imagePath: headerData.imagePath,
                             };

                      this.form.setValue({
                                    gender: this.header.gender,
                                    nom: this.header.nom,
                                    prenom: this.header.prenom,
                                    numero: this.header.numero,
                                    rue: this.header.rue,
                                    complementaire: this.header.commune,
                                    code: this.header.code,
                                    commune: this.header.commune,
                                    telephone: this.header.telephone,
                                    email: this.header.email,
                                    titre: this.header.titre,
                                    phrase: this.header.phrase,
                                  //  cv: this.header.cvPath,
                                    image: this.header.imagePath,

                                   });
          });
       }else {
         this.mode = 'create';
         this.headerId= null;
       }
    });
  }



onImagePicked(event: Event){

  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({image: file});
  this.form.get("image").updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () =>{
    this.imagePreview = <string>reader.result;
  };
  reader.readAsDataURL(file);
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
