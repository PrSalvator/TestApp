import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private router: Router){

  }

  signIn(mail: string, password: string){
    this.fireAuth.signInWithEmailAndPassword(mail, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['note-board']);
    }, err => {
        alert(err.message);
        this.router.navigate(['/sign-in']);
    });
  }

  signOut(){
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/sign-in']);
    }, err => {
      alert(err.message);
    });
  }
}