import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MoiForm } from 'src/app/cv/model/moi.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MoiService } from 'src/app/cv/services/moi.service';

@Component({
  selector: 'app-moi-admin-component',
  templateUrl: './moi-admin-component.html',
  styleUrls: ['./moi-admin-component.css']
})
export class MoiAdminComponent implements OnInit {

 formMoi: FormGroup;
 private mode = 'create';
 private moiId: string;
 moi : MoiForm;

  constructor(public moiService: MoiService, public route: ActivatedRoute, private router: Router ) { }


  onNext(){

    this.router.navigate(["/admin/portfolio"]);
   }
   onPrecedent(){
    this.router.navigate(["/admin/header"]);
   }

onSaveMoi(){
  if(this.formMoi.invalid){
    return;
  }

  if(this.mode ==='create'){
      this.moiService.addMoi(
          this.formMoi.value.titre1,
          this.formMoi.value.titre2,
          this.formMoi.value.titre3,
          this.formMoi.value.titre4,
          this.formMoi.value.presentation1,
          this.formMoi.value.presentation2,
          this.formMoi.value.presentation3,
          this.formMoi.value.presentation4,
       );



  }else{
      this.moiService.updateMoi(
      this.moiId,
      this.formMoi.value.titre1,
      this.formMoi.value.titre2,
      this.formMoi.value.titre3,
      this.formMoi.value.titre4,
      this.formMoi.value.presentation1,
      this.formMoi.value.presentation2,
      this.formMoi.value.presentation3,
      this.formMoi.value.presentation4,
            );
      }
    this.formMoi.reset();
  }

  ngOnInit(){

    this.formMoi = new FormGroup({
      titre1:  new FormControl(null),
      titre2:  new FormControl(null),
      titre3:  new FormControl(null),
      titre4:  new FormControl(null),
      presentation1:  new FormControl(null),
      presentation2:  new FormControl(null),
      presentation3:  new FormControl(null),
      presentation4:  new FormControl(null),
    });


    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('moiId')){
         this.mode = 'edit'

         this.moiId = paramMap.get('moiId');

                this.moiService.getMoi(this.moiId).subscribe(moiData =>{

                          this.moi = {
                            id :moiData._id,
                            titre1: moiData.titre1,
                            titre2: moiData.titre2,
                            titre3: moiData.titre3,
                            titre4: moiData.titre4,
                            presentation1: moiData.presentation1,
                            presentation2: moiData.presentation2,
                            presentation3: moiData.presentation3,
                            presentation4: moiData.presentation4,

                          };

                    this.formMoi.setValue({
                                         titre1: this.moi.titre1,
                                         titre2: this.moi.titre2,
                                         titre3: this.moi.titre3,
                                         titre4: this.moi.titre4,
                                         presentation1: this.moi.presentation1,
                                         presentation2: this.moi.presentation2,
                                         presentation3: this.moi.presentation3,
                                         presentation4: this.moi.presentation4,
                                        });
                 });
          }else {
            this.mode = 'create';
            this.moiId= null;
          }
   });
 }
}
