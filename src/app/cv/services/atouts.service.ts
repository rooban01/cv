import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CommunForm } from '../model/commun-form';

import { environment } from "../../../environments/environment";


const BACKEND_URL = environment.apiUrl + "/atout";

@Injectable({providedIn: 'root'})
export class AtoutService{

  private atouts: CommunForm[] = [];
  private AtoutUpdated = new Subject<CommunForm[]>();


   constructor(private httpClient: HttpClient, private router: Router){}



   getAtouts(){
  this.httpClient.get<{message: string, atouts:any}>(BACKEND_URL)
        .pipe(map((atoutData) => {
           return atoutData.atouts.map(atout =>{
             return{
               titre: atout.titre,
               description: atout.description,
               id: atout._id
             };
           });
        }))
        .subscribe((transformedAtoutData) => {

             this.atouts =  transformedAtoutData;
             this.AtoutUpdated.next([...this.atouts]);
        });

  }

  getAtoutUpdatedListener(){
    return this.AtoutUpdated.asObservable();
  }

  getAtout(id: string){
    return this.httpClient.get<{ _id: string, titre: string, description: string}>

   (BACKEND_URL+"/" + id);
  }


  addAtout(titre: string, description: string){

    const atoutData : CommunForm = {id:null, titre:titre, description:description}

    this.httpClient.post<{message: string, atout: CommunForm}>(BACKEND_URL, atoutData)
    .subscribe(responseData =>{

      this.router.navigate(["/admin20072007/atout"]);
       });
  }



  updateAtout(id: string,  titre: string, description: string){
    let AtoutData: CommunForm;
   AtoutData = {id:id, titre:titre, description:description}

   this.httpClient.put(BACKEND_URL+"/"+ id, AtoutData)
   .subscribe(response => {

      this.router.navigate(["/"]);
   });
  }




}
