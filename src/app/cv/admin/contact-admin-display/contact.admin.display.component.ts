import { Component,OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { ContactForm } from '../../model/contact-form';
import { HeaderForm } from '../../model/header-form';
import { ContactService } from '../../services/contact.service';
import { HeaderService } from '../../services/header.service';
import { AuthService } from '../../services/auth.service';




@Component({
  selector: 'app-contact-admin-display',
  templateUrl: './contact.admin.display.component.html',
  styleUrls: ['./contact.admin.display.component.css']
})
export class ContactAdminDisplayComponent implements OnInit, OnDestroy{
  //contacts : ContactForm;


  // contacts = [{ nom: 'Francois', prenom: 'John', societe: 'airbus' , poste: 'drh', commentaire: 'rdv le', imagePath: 'xxxx', rdv: 'yyyy' },
  //             { nom: 'Francois1', prenom: 'John1', societe: 'airbus1' , poste: 'drh1', commentaire: 'rdv le1', imagePath: 'xxxx1', rdv: 'yyyy1' },
  //             { nom: 'Francois2', prenom: 'John2', societe: 'airbus2' , poste: 'drh2', commentaire: 'rdv le2', imagePath: 'xxxx2', rdv: 'yyyy2' }
  //           ]

contacts: ContactForm []=[];
headers: HeaderForm []=[];
userIsAuthenticated = false;
userId: string;
private contactSub : Subscription;
private headerSub : Subscription;
private authStatusSub : Subscription;


 constructor(public contactService: ContactService,public headerService: HeaderService, private authService: AuthService){ }


  ngOnInit(){
    this.contactService.getContacts();
    this.userId = this.authService.getUserId();
    this.headerService.getHeaders();
    this.contactSub = this.contactService.getContactUpdatedListener()
      .subscribe((contacts: ContactForm[]) => {
        this.contacts= contacts;
      });

      this.headerSub = this.headerService.getHeaderUpdatedListener()
      .subscribe((headers: HeaderForm[]) => {
        this.headers= headers;

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
    this.headerSub.unsubscribe();
  }

  onDelete(contactId: string){
   this.contactService.deleteContact(contactId);
  }
}
