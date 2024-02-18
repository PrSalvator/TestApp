import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{
  mail: string = "";
  password: string = "";
  
  constructor(private auth: AuthService){

  }

  ngOnInit(): void {
    
  }
  signIn(){
    this.auth.signIn(this.mail, this.password)

    this.mail = "";
    this.password = "";
  }
}
