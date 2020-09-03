import { Component, OnInit } from '@angular/core';
import { MoiService } from '../services/moi.service';
import { AuthService } from '../services/auth.service';
import { MoiForm } from '../model/moi.model';
import { Subscription } from 'rxjs';
import { CvService } from '../services/cv.service';
import { CvForm } from '../model/cv.model';



@Component({
  selector: 'app-moi',
  templateUrl: './moi.component.html',
  styleUrls: ['./moi.component.css']
})
export class MoiComponent implements OnInit {

  moi: MoiForm []=[];
  cv: CvForm []=[];

  private contactSub : Subscription;
  private cvSub : Subscription;

  constructor(public moiService: MoiService, private authService: AuthService, public cvService: CvService){ }

  myText:string ='';
 titre : string ='';

 nomElec:string ='';
 elecPath: string ='';

 nomInfo:string ='';
 infoPath : string ='';

 nomSite:string ='';
 sitePath : string ='';




onCursor(id){


  this.moiService.getMois();

  this.contactSub = this.moiService.getMoiUpdatedListener()
    .subscribe((moi: MoiForm[]) => {
      this.moi= moi;

      const titre1 = moi[0].titre1;
      const titre2 = moi[0].titre2;
      const titre3 = moi[0].titre3;
      const titre4 = moi[0].titre4;

      const presentation1 = moi[0].presentation1;
      const presentation2 = moi[0].presentation2;
      const presentation3 = moi[0].presentation3;
      const presentation4 = moi[0].presentation4;



     if(id==='text1'){
     this.titre= titre2;
     this.myText= presentation2;


     }else if (id ==='text2'){
      this.titre= titre3;
     this.myText= presentation3;

      }else if (id ==='text3'){
        this.titre= titre4;
        this.myText= presentation4;


      }else{
        this.titre= titre1;
        this.myText= presentation1;



      }
    });
  }


onHide(id){

  this.moiService.getMois();

  this.contactSub = this.moiService.getMoiUpdatedListener()
    .subscribe((moi: MoiForm[]) => {
      this.moi= moi;
      const titre1 = moi[0].titre1;
      const presentation1 = moi[0].presentation1;
      this.titre= titre1;
      this.myText= presentation1;


});
  }


  ngOnInit() {


    this.moiService.getMois();
    this.cvService.getCvs();

    this.cvSub = this.cvService.getCvUpdatedListener()
     .subscribe((cvs: CvForm[]) => {
       this.cv= cvs;
       const elecNom = cvs[1].nom;
       const elecPath = cvs[1].cvPath;
       const infoNom = cvs[2].nom;
       const infoPath = cvs[2].cvPath;
       const siteNom = cvs[3].nom;
       const sitePath = cvs[3].cvPath;

        this.nomElec = elecNom;
        this.elecPath = elecPath;
        this.nomInfo = infoNom;
        this.infoPath = infoPath;
        this.nomSite = siteNom;
        this.sitePath = sitePath;

     });

    this.contactSub = this.moiService.getMoiUpdatedListener()
      .subscribe((moi: MoiForm[]) => {
        this.moi= moi;

        const titre1 = moi[0].titre1;
        const presentation1 = moi[0].presentation1;

        this.titre = titre1;
        this.myText = presentation1;


      });

  }

}
