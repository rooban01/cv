import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MoiForm } from '../model/moi.model';

import { environment } from "../../../environments/environment";


const BACKEND_URL = environment.apiUrl + "/moi";

@Injectable({providedIn: 'root'})
export class MoiService{

  private mois: MoiForm[] = [];
  private moiUpdated = new Subject<MoiForm[]>();


   constructor(private httpClient: HttpClient, private router: Router){}



   getMois(){
  this.httpClient.get<{message: string, mois:any}>(BACKEND_URL)
        .pipe(map((moiData) => {

           return moiData.mois.map(moi =>{

             return{
               titre1: moi.titre1,
               titre2: moi.titre2,
               titre3: moi.titre3,
               titre4: moi.titre4,
               presentation1: moi.presentation1,
               presentation2: moi.presentation2,
               presentation3: moi.presentation3,
               presentation4: moi.presentation4,
               id: moi._id
             };
           });
        }))
        .subscribe((transformedMoiData) => {

             this.mois =  transformedMoiData;
             this.moiUpdated.next([...this.mois]);
        });

  }

  getMoiUpdatedListener(){
    return this.moiUpdated.asObservable();
  }

  getMoi(id: string){
    return this.httpClient.get<{ _id: string, titre1: string, titre2: string, titre3: string, titre4: string,
                                  presentation1: string,  presentation2: string,
                                  presentation3: string, presentation4: string}>

   (BACKEND_URL+"/" + id);
  }


  addMoi( titre1:string,  titre2: string, titre3: string,
                titre4: string, presentation1: string,  presentation2: string,
                presentation3: string, presentation4: string){

    const moiData : MoiForm = {id:null, titre1:titre1, titre2:titre2, titre3:titre3, titre4:titre4,
                               presentation1:presentation1, presentation2:presentation2, presentation3:presentation3,
                               presentation4:presentation4}

    this.httpClient.post<{message: string, moi: MoiForm}>(BACKEND_URL, moiData)
    .subscribe(responseData =>{

               this.router.navigate(["/"]);
       });
  }



  updateMoi(id: string, titre1:string,  titre2: string, titre3: string,
                    titre4: string, presentation1: string,  presentation2: string,
                    presentation3: string, presentation4: string){
    let moiData: MoiForm;
   moiData = {id:id, titre1:titre1, titre2:titre2, titre3:titre3, titre4:titre4,
              presentation1:presentation1, presentation2:presentation2, presentation3:presentation3,
              presentation4:presentation4}

   this.httpClient.put(BACKEND_URL+"/"+ id, moiData)
   .subscribe(response => {

      this.router.navigate(["/"]);
   });
  }




}
