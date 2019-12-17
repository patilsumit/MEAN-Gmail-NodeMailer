import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenPayload, AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: TokenPayload = {
    _id: '',
    user_name: '',
    email: '',
    password: ''
  }

  constructor(private auth: AuthserviceService, private router: Router) {}

   ngOnInit(){}

  login() {
    this.auth.login(this.credentials).subscribe((response) => {
       console.log(response)
      },
      err => {
        console.error(err)
      }
    )
  }
}


