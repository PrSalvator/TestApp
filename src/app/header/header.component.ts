import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  loggedIn : boolean = true;

  constructor(private auth: AuthService){}

  signOut(){
    this.auth.signOut();
  }
}
