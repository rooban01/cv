import { ContactForm } from '../model/contact-form';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from "../../../environments/environment";


const BACKEND_URL = environment.apiUrl + "/contacts";


@Injectable({providedIn: 'root'})
export class ContactService{

  private  contacts: ContactForm[] = [];
  private contactUpdated = new Subject<ContactForm[]>();

  constructor(private httpClient: HttpClient,
              private router: Router){}

  getContacts(){
    this.httpClient.get<{message: string, contacts:any}>(BACKEND_URL)
        .pipe(map((contactData) => {
           return contactData.contacts.map(contact =>{
             return{
               gender : contact.gender,
               nom: contact.nom,
               prenom1: contact.prenom1,
               poste: contact.poste,
               societe: contact.societe,
               addresse: contact.addresse,
               telephone: contact.telephone,
               email: contact.email,
               commentaire: contact.commentaire,
               id: contact._id,
               creator: contact.creator

             };
           });
        }))
        .subscribe((transformedContactData) => {
             this.contacts =  transformedContactData;
             this.contactUpdated.next([...this.contacts]);
        });

  }

  getContact(id: string){
    return this.httpClient.get<{
         _id: string,
         gender:string,
         nom: string,
         prenom1: string,
         poste: string,
          societe: string,
         commentaire: string,
         rdv: string,
         telephone: string,
         email: string,
         addresse: string,
         creator: string
        }>

   (BACKEND_URL+"/" + id);
  }



  getContactUpdatedListener(){
    return this.contactUpdated.asObservable();
  }

  addContact(

    gender: string,
    nom: string,
    prenom1: string,
    poste: string,
    societe: string,
    addresse: string,
    telephone: string,
    email: string,
    rdv: string,
    commentaire: string,
   // image: File,

  ){

    const contactData : ContactForm = {id:null, gender: gender, nom:nom, prenom1: prenom1,poste: poste,societe: societe, addresse:addresse, telephone: telephone, email: email, rdv: rdv, commentaire: commentaire,creator:null }


    // const contactData = new FormData();  //to use blob and text value
    // contactData.append("gender", gender);
    // contactData.append("nom", nom);
    // contactData.append("prenom1", prenom1);
    // contactData.append("poste", poste);
    // contactData.append("societe", societe);
    // contactData.append("addresse", addresse);
    // contactData.append("telephone", telephone);
    // contactData.append("email", email);
    // contactData.append("rdv", rdv);
    // contactData.append("commentaire", commentaire);
  //  contactData.append("image", image, nom);


    this.httpClient.post<{message: string, contact: ContactForm}>(BACKEND_URL, contactData)
        .subscribe(responseData =>{

          this.router.navigate(["/contacts"]);

        });

  }

updateContact(
      id:string,
      gender: string,
      nom: string,
      prenom1: string,
      poste: string,
      societe: string,
      addresse: string,
      telephone: string,
      email: string,
      rdv: string,
      commentaire: string,
         ){

    //let contactData: ContactForm | FormData ;

    // if(typeof(rdv)==='object'){  //changer a image si on utilise image
    //  contactData = new FormData();
    //  contactData.append("id", id);
    //   contactData.append("gender", gender);
    //   contactData.append("nom", nom);
    //   contactData.append("prenom1", prenom1);
    //   contactData.append("societe", societe);

    //  contactData.append("addresse", addresse);
    //   contactData.append("email", email);
    //   contactData.append("telephone", telephone);
    //   contactData.append("poste", poste);
    //   contactData.append("image", image,nom);
    //   contactData.append("commentaire", commentaire);
    //   contactData.append("rdv", rdv);

 //   }else{
  let contactData : ContactForm
     contactData = {
        id:id,
        gender: gender,
        nom: nom,
        prenom1: prenom1,
        poste: poste,
        societe: societe,
        addresse: addresse,
        telephone: telephone,
        email: email,
        rdv: rdv,
        commentaire: commentaire,
        creator : null,
       //  imagePath: image,
      };

    //}

    this.httpClient.put(BACKEND_URL +"/"+ id, contactData)
         .subscribe(response => {
            // const updatedContacts = [...this.contacts];
            // const oldContactIndex = updatedContacts.findIndex(c => c.id === id);
            // const contact: ContactForm ={
            //   id:id,
            //   gender: gender,
            //   nom: nom,
            //   prenom1: prenom1,
            //   societe: societe,
            //   poste: poste,
            //   commentaire: commentaire,
            //   imagePath:"",
            //   rdv: rdv
            // }
            // updatedContacts[oldContactIndex] = contact;
            // this.contacts = updatedContacts;
            // this.contactUpdated.next([...this.contacts]);
            this.router.navigate(["/"]);
         });
}

  deleteContact(contactId: string){
    this.httpClient.delete(BACKEND_URL +"/"+ contactId)
       .subscribe(() => {
           const updatedContacts = this.contacts.filter(contact => contact.id !== contactId);
           this.contacts = updatedContacts;
           this.contactUpdated.next([...this.contacts]);
       });

  }



}
