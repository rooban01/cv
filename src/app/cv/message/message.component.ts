import { Component, OnInit } from '@angular/core';
import { ContactForm } from '../model/contact-form';
import { HeaderForm } from '../model/header-form';
import { ContactService } from '../services/contact.service';
import { Subscription } from 'rxjs';
import { HeaderService } from '../services/header.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-messsage',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

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
