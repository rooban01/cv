import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CommunForm } from '../model/commun-form';



import { environment } from "../../../environments/environment";


const BACKEND_URL = environment.apiUrl + "/loisir";

@Injectable({providedIn: 'root'})
export class LoisirService{

  private loisirs: CommunForm[] = [];
  private LoisirUpdated = new Subject<CommunForm[]>();


   constructor(private httpClient: HttpClient, private router: Router){}



   getLoisirs(){
  this.httpClient.get<{message: string, loisirs:any}>(BACKEND_URL)
        .pipe(map((loisirData) => {
           return loisirData.loisirs.map(loisir =>{
             return{
               titre: loisir.titre,
               description: loisir.description,
               id: loisir._id
             };
           });
        }))
        .subscribe((transformedLoisirData) => {

             this.loisirs =  transformedLoisirData;
             this.LoisirUpdated.next([...this.loisirs]);
        });

  }

  getLoisirUpdatedListener(){
    return this.LoisirUpdated.asObservable();
  }

  getLoisir(id: string){
    return this.httpClient.get<{ _id: string, titre: string, description: string}>

   (BACKEND_URL+"/" + id);
  }


  addLoisir(titre: string, description: string){

    const loisirData : CommunForm = {id:null, titre:titre, description:description}

    this.httpClient.post<{message: string, loisir: CommunForm}>(BACKEND_URL, loisirData)
    .subscribe(responseData =>{

      this.router.navigate(["/admin20072007/loisir"]);
       });
  }



  updateLoisir(id: string,  titre: string, description: string){
    let LoisirData: CommunForm;
   LoisirData = {id:id, titre:titre, description:description}

   this.httpClient.put(BACKEND_URL+"/"+ id, LoisirData)
   .subscribe(response => {

      this.router.navigate(["/"]);
   });
  }




}
