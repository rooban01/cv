import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/cv/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy{

  signupForm : FormGroup;
  isLoading = false;
  private authStatusSub: Subscription;
  constructor(public authService: AuthService){}


  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }


  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
           this.isLoading = false;
      });
      this.signupForm = new FormGroup({
        email: new FormControl(null, {validators:[Validators.required, Validators.email]}),
        password: new FormControl(null, {validators:[Validators.required, Validators.minLength(6)]})
      })
  }


  onSubmit(){
   if(this.signupForm.invalid){
     return;
   }
   this.isLoading = true;
    this.authService.createUser(this.signupForm.value.email, this.signupForm.value.password);


  }

}
