import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  // signinForm: FormGroup;
  signinForm: any;
  error: any;
  public loginData: any;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      email: ['' , [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() { }

  login() {
    const userId = localStorage.getItem('id');
    return this.authService.signIn(this.signinForm.value);

  }

  // login() {
  //   console.log(this.signinForm.value);
  //   if (this.signinForm.valid) {
  //     this.loginData.signIn(this.signinForm.value).subscribe((result: any) => {
  //       console.log(result);
  //       if (result.auth) {
  //         this.router.navigate(['user-profile']);
  //       } else {
  //         this.error = result.message;
  //       }
  //     });
  //   }
  // }
}
