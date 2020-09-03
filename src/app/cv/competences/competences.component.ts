import { Component, OnInit, HostBinding, HostListener, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { CompetanceService } from '../services/competance.service';
import { ExperienceService } from '../services/experience.service';

import { ExperienceForm } from '../model/experience.model';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.css']
})
export class CompetencesComponent implements OnInit, OnDestroy {


  constructor(private competanceService: CompetanceService, private experienceService: ExperienceService ){}




    onShow(id){

        document.getElementById(id).style.display = 'block';
        document.getElementById(id).style.visibility ="visible";
     //   document.getElementsByName("com")[0].style.visibility ="none";
      }




    onHide(id){

      document.getElementById(id).style.display = "none";
      }


  ngOnInit() {


  }


  ngOnDestroy(){

  }
}
