import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide: boolean = false;
  userNameFormControl = new FormControl('', [Validators.required]);
  passFormControl = new FormControl('', [Validators.required]);

  constructor(private http: HttpClient, private router: Router) {}
  login() {
    this.http.post(env.apiUrl + 'authenticate/login', {
      username: this.userNameFormControl.value,
      password: this.passFormControl.value,
    }).subscribe((res:any) => {
      if(res.token && res.refreshToken){
        localStorage.setItem('token', res.token);
        this.router.navigate(['home'])
      }
    })
  }
}
