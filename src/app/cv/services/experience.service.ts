import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ExperienceForm } from '../model/experience.model';

import { environment } from "../../../environments/environment";


const BACKEND_URL = environment.apiUrl + "/experience";

@Injectable({providedIn: 'root'})
export class ExperienceService{

  private experiences: ExperienceForm[] = [];
  private ExperienceUpdated = new Subject<ExperienceForm[]>();


   constructor(private httpClient: HttpClient, private router: Router){}



   getExperiences(){
  this.httpClient.get<{message: string, experiences:any}>(BACKEND_URL)
        .pipe(map((experienceData) => {
           return experienceData.experiences.map(experience =>{
             return{
               date1: experience.date1,
               societe: experience.societe,
               poste: experience.poste,
               description: experience.description,

               id: experience._id
             };
           });
        }))
        .subscribe((transformedExperienceData) => {

             this.experiences =  transformedExperienceData;
             this.ExperienceUpdated.next([...this.experiences]);
        });

  }

  getExperienceUpdatedListener(){
    return this.ExperienceUpdated.asObservable();
  }

  getExperience(id: string){
    return this.httpClient.get<{ _id: string, date1: string, societe: string, poste: string, description: string}>

   (BACKEND_URL+"/" + id);
  }


  addExperience(date1: string, societe: string, poste: string, description: string){

    const experienceData : ExperienceForm = {id:null, date1:date1, societe:societe, poste:poste, description:description}

    this.httpClient.post<{message: string, experience: ExperienceForm}>(BACKEND_URL, experienceData)
    .subscribe(responseData =>{

      this.router.navigate(["/admin20072007/experience"]);
       });
  }



  updateExperience(id: string,  date1: string, societe: string, poste: string, description: string){
    let ExperienceData: ExperienceForm;
   ExperienceData = {id:id, date1:date1, societe:societe, poste:poste, description:description}

   this.httpClient.put(BACKEND_URL+"/"+ id, ExperienceData)
   .subscribe(response => {

      this.router.navigate(["/"]);
   });
  }




}
