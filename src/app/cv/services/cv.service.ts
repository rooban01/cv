import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CvForm } from '../model/cv.model';


import { environment } from "../../../environments/environment";


const BACKEND_URL = environment.apiUrl + "/cv";


@Injectable({providedIn: 'root'})
export class CvService{

  private  cvs: CvForm[] = [];
  private cvUpdated = new Subject<CvForm[]>();

  constructor(private httpClient: HttpClient,
              private router: Router){}

  getCvs(){
    this.httpClient.get<{message: string, cvs:any}>(BACKEND_URL)
        .pipe(map((cvData) => {
           return cvData.cvs.map(cv =>{
             return{
               id: cv._id,
               nom: cv.nom,
               cvPath: cv.cvPath,

             };
           });
        }))
        .subscribe((transformedCvData) => {
             this.cvs =  transformedCvData;
             this.cvUpdated.next([...this.cvs]);
        });

  }

  getCv(id: string){
    return this.httpClient.get<{
          _id: string,
          nom: string;
         cvPath: string;
        }>

   (BACKEND_URL+"/" + id);
  }



  getCvUpdatedListener(){
    return this.cvUpdated.asObservable();
  }

  addCv(
    nom: string,
    cv: File,
  ){
    const cvData = new FormData();  //to use blob and text value


    cvData.append("nom", nom);
    cvData.append("cv", cv, nom);

    this.httpClient.post<{message: string, cv: CvForm}>(BACKEND_URL, cvData)
        .subscribe(responseData =>{

          this.router.navigate(["/"]);
        });

  }

updateCv(
          id: string,
          nom: string,
          cv:  File | string,
        ){


    let cvData: CvForm | FormData ;

    if((typeof(cv) ==='object') ){
        cvData = new FormData();
        cvData.append("id", id);
        cvData.append("nom", nom);
        cvData.append("cv", cv, nom);


    }else{

     cvData = {
      id: id,
      nom: nom,
      cvPath: cv,
      };
    }

    this.httpClient.put(BACKEND_URL+"/"+ id, cvData)
         .subscribe(response => {


            this.router.navigate(["/"]);
         });
}

  deleteCv(cvId: string){
    this.httpClient.delete(BACKEND_URL+"/"+ cvId)
       .subscribe(() => {
           const updatedContacts = this.cvs.filter(cv => cv.id !== cvId);
           this.cvs = updatedContacts;
           this.cvUpdated.next([...this.cvs]);
       });

  }



}
