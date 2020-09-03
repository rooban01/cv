import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HeaderForm } from '../model/header-form';


import { environment } from "../../../environments/environment";


const BACKEND_URL = environment.apiUrl + "/headers";


@Injectable({providedIn: 'root'})
export class HeaderService{

  private  headers: HeaderForm[] = [];
  private headerUpdated = new Subject<HeaderForm[]>();

  constructor(private httpClient: HttpClient,
              private router: Router){}

  getHeaders(){
    this.httpClient.get<{message: string, headers:any}>(BACKEND_URL)
        .pipe(map((headerData) => {
           return headerData.headers.map(header =>{
             return{
               id: header._id,
               gender : header.gender,
               nom: header.nom,
               prenom: header.prenom,
               numero: header.numero,
               rue: header.rue,
               complementaire: header.complementaire,
               code: header.code,
               commune: header.commune,
               telephone: header.telephone,
               email: header.email,
               titre: header.titre,
               phrase: header.phrase,
             //  cvPath: header.cvPath,
               imagePath: header.imagePath,
             };
           });
        }))
        .subscribe((transformedHeaderData) => {
             this.headers =  transformedHeaderData;
             this.headerUpdated.next([...this.headers]);
        });

  }

  getHeader(id: string){
    return this.httpClient.get<{
          _id: string,
          gender: string;
          nom: string;
          prenom: string;
          numero: string;
          rue: string;
          complementaire: string;
          code: string;
          commune: string;
          telephone: string;
          email: string;
          titre: string;
          phrase: string;
        //  cvPath: string;
         imagePath: string;

        }>

   (BACKEND_URL+"/" + id);
  }



  getHeaderUpdatedListener(){
    return this.headerUpdated.asObservable();
  }

  addHeader(
    gender: string,
    nom: string,
    prenom: string,
    numero: string,
    rue: string,
    complementaire: string,
    code: string,
    commune: string,
    telephone: string,
    email: string,
    titre: string,
    phrase: string,
    image: File,
  //  cv: File,
  ){
    const headerData = new FormData();  //to use blob and text value

    headerData.append("gender", gender);
    headerData.append("nom", nom);
    headerData.append("prenom", prenom);
    headerData.append("numero", numero);
    headerData.append("rue", rue);
    headerData.append("complementaire", complementaire);
    headerData.append("code", code);
    headerData.append("commune", commune);
    headerData.append("image", image, nom);
   // headerData.append("cv", cv, nom);
    headerData.append("telephone", telephone);
    headerData.append("email", email);
    headerData.append("titre", titre);
    headerData.append("phrase", phrase);

    this.httpClient.post<{message: string, header: HeaderForm}>(BACKEND_URL, headerData)
        .subscribe(responseData =>{

          this.router.navigate(["/"]);
        });

  }

updateHeader(
          id: string,
          gender: string,
          nom: string,
          prenom: string,
          numero: string,
          rue: string,
          complementaire: string,
          code: string,
          commune: string,
          telephone: string,
          email: string,
          titre: string,
          phrase: string,
          image: File | string,
       //   cv:  File,
        ){


    let headerData: HeaderForm | FormData ;

    if((typeof(image) ==='object') ){
        headerData = new FormData();
        headerData.append("id", id);
        headerData.append("gender", gender);
        headerData.append("nom", nom);
        headerData.append("prenom", prenom);
        headerData.append("numero", numero);
        headerData.append("rue", rue);
        headerData.append("complementaire", complementaire);
        headerData.append("code", code);
        headerData.append("commune", commune);
        headerData.append("image", image, nom);
    //    headerData.append("cv", cv);
        headerData.append("telephone", telephone);
        headerData.append("email", email);
        headerData.append("titre", titre);
        headerData.append("phrase", phrase);

    }else{

     headerData = {
      id: id,
      gender: gender,
      nom: nom,
      prenom: prenom,
      numero: numero,
      rue: rue,
      complementaire: complementaire,
      code: code,
      commune: commune,
      telephone: telephone,
      email: email,
      titre: titre,
      phrase: phrase,
      imagePath: image,
    //  cvPath: null,
      };
    }

    this.httpClient.put(BACKEND_URL+"/"+ id, headerData)
         .subscribe(response => {


            this.router.navigate(["/"]);
         });
}

  deleteHeader(headerId: string){
    this.httpClient.delete(BACKEND_URL+"/"+ headerId)
       .subscribe(() => {
           const updatedContacts = this.headers.filter(header => header.id !== headerId);
           this.headers = updatedContacts;
           this.headerUpdated.next([...this.headers]);
       });

  }



}
