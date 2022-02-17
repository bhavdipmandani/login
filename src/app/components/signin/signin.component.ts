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
  signinForm: FormGroup;
  private error: any;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit() { }

  login() {
    const userId = localStorage.getItem('id');
    if (this.signinForm.valid) {
      this.authService.signIn(this.signinForm.value);
      if (userId) {
        this.router.navigate(['user-profile']);
      } else {
         // window.alert('Enter valid value');
        // this.error = result.message;
      }
    }
  }
}
