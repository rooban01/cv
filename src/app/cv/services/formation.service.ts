import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormationForm } from '../model/formation-form';


import { environment } from "../../../environments/environment";


const BACKEND_URL = environment.apiUrl + "/formation";

@Injectable({providedIn: 'root'})
export class FormationService{

  private formations: FormationForm[] = [];
  private FormationUpdated = new Subject<FormationForm[]>();


   constructor(private httpClient: HttpClient, private router: Router){}



   getFormations(){
  this.httpClient.get<{message: string, formations:any}>(BACKEND_URL)
        .pipe(map((formationData) => {
           return formationData.formations.map(formation =>{
             return{
               date1: formation.date1,
               diplome: formation.diplome,
               lieu: formation.lieu,
               description: formation.description,

               id: formation._id
             };
           });
        }))
        .subscribe((transformedFormationData) => {

             this.formations =  transformedFormationData;
             this.FormationUpdated.next([...this.formations]);
        });

  }

  getFormationUpdatedListener(){
    return this.FormationUpdated.asObservable();
  }

  getFormation(id: string){
    return this.httpClient.get<{ _id: string, date1: string, diplome: string, lieu: string, description: string}>

   (BACKEND_URL+"/" + id);
  }


  addFormation(date1: string, diplome: string, lieu: string, description: string){

    const formationData : FormationForm = {id:null, date1:date1, diplome:diplome, lieu:lieu, description:description}

    this.httpClient.post<{message: string, formation: FormationForm}>(BACKEND_URL, formationData)
    .subscribe(responseData =>{

      this.router.navigate(["/admin20072007/formation"]);
       });

  }



  updateFormation(id: string,  date1: string, diplome: string, lieu: string, description: string){
    let FormationData: FormationForm;
   FormationData = {id:id, date1:date1, diplome:diplome, lieu:lieu, description:description}

   this.httpClient.put(BACKEND_URL+"/"+ id, FormationData)
   .subscribe(response => {

      this.router.navigate(["/"]);
   });
  }




}
