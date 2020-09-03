import { Component, OnInit } from '@angular/core';
import { PortfolioForm } from '../model/portfolio.model';
import { Subscription } from 'rxjs';
import { PortfolioService } from '../services/portfolio.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  portfolios: PortfolioForm []=[];
  userIsAuthenticated = false;
  userId: string;
  private contactSub : Subscription;
  private authStatusSub : Subscription;


   constructor(public portfolioService: PortfolioService, private authService: AuthService){ }



    ngOnInit(){

     this.portfolioService.getPortfolios();



      this.userId = this.authService.getUserId();
      this.contactSub = this.portfolioService.getPortfolioUpdatedListener()
        .subscribe((portfolios: PortfolioForm[]) => {
          this.portfolios= portfolios;

        });

        this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAthenticatid =>{
          this.userIsAuthenticated = isAthenticatid;
          this.userId = this.authService.getUserId();
      });
    }

    ngOnDestroy() {
      this.contactSub.unsubscribe();
      this.authStatusSub.unsubscribe();
    }


  }
