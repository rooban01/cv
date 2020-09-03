import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PortfolioForm } from '../../model/portfolio.model';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-portfolio-admin-component',
  templateUrl: './portfolio-admin-component.html',
  styleUrls: ['./portfolio-admin-component.css']
})
export class PortfolioAdminComponent implements OnInit {
  form: FormGroup;
  private mode = 'create';
  private portfolioId: string;
  portfolioForm : PortfolioForm;

   constructor(public portfolioService: PortfolioService, public route: ActivatedRoute , private router: Router) { }

   onNext(){

    this.router.navigate(["/admin/informatique"]);
   }
   onPrecedent(){
    this.router.navigate(["/admin/moi"]);
   }


 onSave(){
   if(this.form.invalid){
     return;
   }

   if(this.mode ==='create'){

       this.portfolioService.addPortfolio(
        this.form.value.nom,
        this.form.value.description,
        this.form.value.description1,
        this.form.value.lien,
        this.form.value.btn,
        );



   }else{
       this.portfolioService.updatePortfolio(
       this.portfolioId,
       this.form.value.nom,
       this.form.value.description,
       this.form.value.description1,
       this.form.value.lien,
       this.form.value.btn,
             );
       }
     this.form.reset();
   }

   ngOnInit(){

     this.form = new FormGroup({
       nom:  new FormControl(null),
       description:  new FormControl(null),
       description1:  new FormControl(null),
       lien:  new FormControl(null),
       btn:  new FormControl(null),

     });


     this.route.paramMap.subscribe((paramMap: ParamMap) => {
       if(paramMap.has('portfolioId')){
          this.mode = 'edit'

          this.portfolioId = paramMap.get('portfolioId');

                 this.portfolioService.getPortfolio(this.portfolioId).subscribe(portfolioData =>{

                           this.portfolioForm = {
                             id :portfolioData._id,
                             nom: portfolioData.nom,
                             description: portfolioData.description,
                             description1: portfolioData.description1,
                             lien: portfolioData.lien,
                             btn: portfolioData.btn,

                           };

                     this.form.setValue({
                                          nom: this.portfolioForm.nom,
                                          description: this.portfolioForm.description,
                                          description1: this.portfolioForm.description1,
                                          lien: this.portfolioForm.lien,
                                          btn: this.portfolioForm.btn,

                                         });
                  });
           }else {
             this.mode = 'create';
             this.portfolioId= null;
           }
    });
  }
}
