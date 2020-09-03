import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PortfolioForm } from '../model/portfolio.model';

import { environment } from "../../../environments/environment";


const BACKEND_URL = environment.apiUrl + "/portfolio";

@Injectable({providedIn: 'root'})
export class PortfolioService{

  private portfolios: PortfolioForm[] = [];
  private PortfolioUpdated = new Subject<PortfolioForm[]>();


   constructor(private httpClient: HttpClient, private router: Router){}



   getPortfolios(){
  this.httpClient.get<{message: string, portfolios:any}>(BACKEND_URL)
        .pipe(map((portfolioData) => {
           return portfolioData.portfolios.map(portfolio =>{
             return{
               nom: portfolio.nom,
               description: portfolio.description,
               description1: portfolio.description1,
               lien: portfolio.lien,
               btn: portfolio.btn,

               id: portfolio._id
             };
           });
        }))
        .subscribe((transformedPortfolioData) => {

             this.portfolios =  transformedPortfolioData;
             this.PortfolioUpdated.next([...this.portfolios]);
        });

  }

  getPortfolioUpdatedListener(){
    return this.PortfolioUpdated.asObservable();
  }

  getPortfolio(id: string){
    return this.httpClient.get<{ _id: string, nom: string, description: string, description1: string, lien: string, btn: string}>

   (BACKEND_URL+"/" + id);
  }


  addPortfolio(nom: string, description: string, description1: string, lien: string, btn: string){

    const portfolioData : PortfolioForm = {id:null, nom:nom, description:description, description1:description1, lien:lien, btn:btn}

    this.httpClient.post<{message: string, portfolio: PortfolioForm}>(BACKEND_URL, portfolioData)
    .subscribe(responseData =>{

      this.router.navigate(["/admin20072007/portfolio"]);
       });
  }



  updatePortfolio(id: string,  nom: string, description: string, description1: string, lien: string, btn: string){
    let PortfolioData: PortfolioForm;
   PortfolioData = {id:id, nom:nom , description:description , description1:description1, lien:lien, btn:btn}

   this.httpClient.put(BACKEND_URL+"/"+ id, PortfolioData)
   .subscribe(response => {

      this.router.navigate(["/"]);
   });
  }




}
