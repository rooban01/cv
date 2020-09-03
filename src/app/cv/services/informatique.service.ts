import { Injectable } from '@angular/core';
import { CommunForm } from '../model/commun-form';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from "../../../environments/environment";
import { map } from 'rxjs/operators';


const BACKEND_URL = environment.apiUrl + "/informatique";


@Injectable({
  providedIn: 'root'
})
export class InformatiqueService {
  private informatiques: CommunForm[] = [];
  private InformatiqueUpdated = new Subject<CommunForm[]>();


   constructor(private httpClient: HttpClient, private router: Router){}



   getInformatiques(){
  this.httpClient.get<{message: string, informatiques:any}>(BACKEND_URL)
        .pipe(map((informatiqueData) => {
           return informatiqueData.informatiques.map(informatique =>{
             return{
               titre: informatique.titre,
               description: informatique.description,
               id: informatique._id
             };
           });
        }))
        .subscribe((transformedInformatiqueData) => {

             this.informatiques =  transformedInformatiqueData;
             this.InformatiqueUpdated.next([...this.informatiques]);
        });

  }

  getInformatiqueUpdatedListener(){
    return this.InformatiqueUpdated.asObservable();
  }

  getInformatique(id: string){
    return this.httpClient.get<{ _id: string, titre: string, description: string}>

   (BACKEND_URL+"/" + id);
  }


  addInformatique(titre: string, description: string){

    const informatiqueData : CommunForm = {id:null, titre:titre, description:description}

    this.httpClient.post<{message: string, informatique: CommunForm}>(BACKEND_URL, informatiqueData)
    .subscribe(responseData =>{

      this.router.navigate(["/admin20072007/informatique"]);
       });
  }



  updateInformatique(id: string,  titre: string, description: string){
    let InformatiqueData: CommunForm;
   InformatiqueData = {id:id, titre:titre, description:description}

   this.httpClient.put(BACKEND_URL+"/"+ id, InformatiqueData)
   .subscribe(response => {

      this.router.navigate(["/"]);
   });
  }




}
