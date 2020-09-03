import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/cv/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{

  loginForm: FormGroup;
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
      this.loginForm = new FormGroup({
        email: new FormControl(null, {validators:[Validators.required, Validators.email]}),
        password: new FormControl(null, {validators:[Validators.required, Validators.minLength(6)]})
      });
  }

  onSubmit(){
    if(this.loginForm.invalid){
      return;
    }
   this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
}
}

