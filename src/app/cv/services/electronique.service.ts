import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CommunForm } from '../model/commun-form';

import { environment } from "../../../environments/environment";


const BACKEND_URL = environment.apiUrl + "/electronique";

@Injectable({providedIn: 'root'})
export class ElectroniqueService{

  private electroniques: CommunForm[] = [];
  private ElectroniqueUpdated = new Subject<CommunForm[]>();


   constructor(private httpClient: HttpClient, private router: Router){}



   getElectroniques(){
  this.httpClient.get<{message: string, electroniques:any}>(BACKEND_URL)
        .pipe(map((electroniqueData) => {
           return electroniqueData.electroniques.map(electronique =>{
             return{
               titre: electronique.titre,
               description: electronique.description,
               id: electronique._id
             };
           });
        }))
        .subscribe((transformedElectroniqueData) => {

             this.electroniques =  transformedElectroniqueData;
             this.ElectroniqueUpdated.next([...this.electroniques]);
        });

  }

  getElectroniqueUpdatedListener(){
    return this.ElectroniqueUpdated.asObservable();
  }

  getElectronique(id: string){
    return this.httpClient.get<{ _id: string, titre: string, description: string}>

   (BACKEND_URL+"/" + id);
  }


  addElectronique(titre: string, description: string){

    const electroniqueData : CommunForm = {id:null, titre:titre, description:description}

    this.httpClient.post<{message: string, electronique: CommunForm}>(BACKEND_URL, electroniqueData)
    .subscribe(responseData =>{

      this.router.navigate(["/admin20072007/electronique"]);
       });
  }



  updateElectronique(id: string,  titre: string, description: string){
    let ElectroniqueData: CommunForm;
   ElectroniqueData = {id:id, titre:titre, description:description}

   this.httpClient.put(BACKEND_URL+"/"+ id, ElectroniqueData)
   .subscribe(response => {

      this.router.navigate(["/"]);
   });
  }




}
