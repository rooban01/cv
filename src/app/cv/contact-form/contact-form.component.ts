import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ContactForm } from '../model/contact-form';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {


  constructor(public contactService: ContactService, public route: ActivatedRoute) { }

enteredgender= '';
enterednNom = '';
enteredprenom1 = '';
enteredPoste = '';
enteredSociete = '';
enteredCommentaire ='';
enteredImagePath = '';
enteredRdv ='';
enteredRdv1 ='';
//enteredTelephone ='';

isLoading = false;
form: FormGroup;
imagePreview: string;
 private mode = 'create';
 private contactId: string;
 contact: ContactForm;

 //@Output() contactCreated = new EventEmitter<ContactForm>();



onSaveContacts(){
  if(this.form.invalid){
    return;
  }

  if(this.mode ==='create'){

      //this.contactCreated.emit(contact);
      this.contactService.addContact(
        this.form.value.gender,
        this.form.value.nom,
        this.form.value.prenom1,
        this.form.value.poste,
        this.form.value.societe,
        this.form.value.addresse,
        this.form.value.telephone,
        this.form.value.email,
        this.form.value.rdv,
       this.form.value.commentaire,
       );
  }else{
    this.contactService.updateContact(
            this.contactId,
            this.form.value.gender,
            this.form.value.nom,
            this.form.value.prenom1,
            this.form.value.poste,
            this.form.value.societe,
            this.form.value.addresse,
            this.form.value.telephone,
            this.form.value.email,
            this.form.value.rdv,
          this.form.value.commentaire,
            );
      }
    this.form.reset();
  }




  ngOnInit() {
    this.form = new FormGroup({
          gender: new FormControl(null),
          nom:  new FormControl(null, { validators: [Validators.required, Validators.minLength(2)]}),
          prenom1: new FormControl(null),
          poste: new FormControl(null),
          societe: new FormControl(null),
          addresse: new FormControl(null),
          telephone: new FormControl(null),
          email: new FormControl(null),
          rdv: new FormControl(null),
          commentaire: new FormControl(null),

         // imagePath: new FormControl(null, {validators: [Validators.required],asyncValidators: [mimeType]}),
         // image: new FormControl(null),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
       if(paramMap.has('contactId')){
          this.mode = 'edit'

          this.contactId = paramMap.get('contactId');

          this.contactService.getContact(this.contactId).subscribe(contactData =>{

              this.contact = {

                               id : contactData._id,
                               gender: contactData.gender,
                               nom: contactData.nom,
                               prenom1: contactData.prenom1,
                               poste: contactData.poste,
                               societe: contactData.societe,
                               addresse: contactData.addresse,

                               email: contactData.email,
                               telephone: contactData.telephone,
                            //   imagePath: contactData.imagePath,
                               rdv: contactData.rdv,
                               commentaire: contactData.commentaire,
                               creator: contactData.creator
                             };

                      this.form.setValue({
                                          gender: this.contact.gender,
                                          nom: this.contact.nom,
                                          prenom1: this.contact.prenom1,
                                          poste: this.contact.poste,
                                          societe: this.contact.societe,
                                          addresse: this.contact.addresse,
                                          email: this.contact.email,
                                          telephone: this.contact.telephone,
                                          rdv: this.contact.rdv,
                                          commentaire: this.contact.commentaire,
                                        //  image: this.contact.imagePath,
                                      });
          });
       }else {
         this.mode = 'create';
         this.contactId= null;
       }
    });
  }



onImagePicked(event: Event){

  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({image: file});
  this.form.get("image").updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () =>{
    this.imagePreview = <string>reader.result;
  };
  reader.readAsDataURL(file);
}
}

