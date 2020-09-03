import { Injectable } from '@angular/core';
import { CompetanceForm } from '../model/competanceForm';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { environment } from "../../../environments/environment";


const BACKEND_URL = environment.apiUrl + "/competances";

@Injectable({providedIn: 'root'})
export class CompetanceService{

  private competances: CompetanceForm[] = [];
  private competanceUpdated = new Subject<CompetanceForm[]>();


   constructor(private httpClient: HttpClient, private router: Router){}



   getCompetances(){
    this.httpClient.get<{message: string, competances:any}>(BACKEND_URL)
        .pipe(map((competanceData) => {

           return competanceData.competances.map(competance =>{

             return{
               sujet: competance.sujet,
               niveau: competance.niveau,
               commentaire: competance.commentaire,
               id: competance._id
             };
           });
        }))
        .subscribe((transformedcompetanceData) => {
             this.competances =  transformedcompetanceData;
             this.competanceUpdated.next([...this.competances]);
        });

  }

getSujet(){
  return this.getSujet();
}

  getCompetanceUpdatedListener(){
    return this.competanceUpdated.asObservable();
  }

  getCompetance(id: string){
    return this.httpClient.get<{ _id: string, sujet:string,  niveau: number, commentaire: string }>

   (BACKEND_URL+"/" + id);
  }


  addCompetance(sujet: string , niveau: number, commentaire: string){

    const competanceData : CompetanceForm = {id:null, sujet: sujet, niveau: niveau, commentaire: commentaire}
    //competanceData.append('sujet', sujet);
    // competanceData.append('niveau', niveau);
    // competanceData.append('commentaire', commentaire);
    // console.log( competanceData)
    // console.log(sujet)
    this.httpClient.post<{message: string, competance: CompetanceForm}>(BACKEND_URL, competanceData)
    .subscribe(responseData =>{
      this.router.navigate(["/admin20072007/informatique"]);
       });
  }



  updateCompetance(id: string, sujet: string , niveau: number, commentaire: string){
    let competanceData: CompetanceForm;
   competanceData = { id:id, sujet:sujet, niveau: niveau, commentaire: commentaire}

   this.httpClient.put(BACKEND_URL+"/"+ id, competanceData)
   .subscribe(response => {

      this.router.navigate(["/"]);
   });
  }




}
