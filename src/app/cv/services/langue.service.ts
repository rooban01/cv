import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CommunForm } from '../model/commun-form';


import { environment } from "../../../environments/environment";


const BACKEND_URL = environment.apiUrl + "/langue";

@Injectable({providedIn: 'root'})
export class LangueService{

  private langues: CommunForm[] = [];
  private LangueUpdated = new Subject<CommunForm[]>();


   constructor(private httpClient: HttpClient, private router: Router){}



   getLangues(){
  this.httpClient.get<{message: string, langues:any}>(BACKEND_URL)
        .pipe(map((langueData) => {
           return langueData.langues.map(langue =>{
             return{
               titre: langue.titre,
               description: langue.description,
               id: langue._id
             };
           });
        }))
        .subscribe((transformedLangueData) => {

             this.langues =  transformedLangueData;
             this.LangueUpdated.next([...this.langues]);
        });

  }

  getLangueUpdatedListener(){
    return this.LangueUpdated.asObservable();
  }

  getLangue(id: string){
    return this.httpClient.get<{ _id: string, titre: string, description: string}>

   (BACKEND_URL+"/" + id);
  }


  addLangue(titre: string, description: string){

    const langueData : CommunForm = {id:null, titre:titre, description:description}

    this.httpClient.post<{message: string, langue: CommunForm}>(BACKEND_URL, langueData)
    .subscribe(responseData =>{

      this.router.navigate(["/admin20072007/langue"]);
       });
  }



  updateLangue(id: string,  titre: string, description: string){
    let LangueData: CommunForm;
   LangueData = {id:id, titre:titre, description:description}

   this.httpClient.put(BACKEND_URL+"/"+ id, LangueData)
   .subscribe(response => {

      this.router.navigate(["/"]);
   });
  }




}
