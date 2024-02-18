import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuillModule } from 'ngx-quill';

import { ButtonModule } from 'primeng/button';
import { CardComponentComponent } from './card-component/card-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { GalleriaModule } from 'primeng/galleria';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';

import { CardModule } from 'primeng/card';
import { HeaderComponent } from './header/header.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NoteBoardComponent } from './note-board/note-board.component';
import { PasswordModule } from 'primeng/password';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { ScrollerModule } from 'primeng/scroller';
import { EditComponent } from './edit/edit.component';
import { NoteDetailsComponent } from './note-details/note-details.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    CardComponentComponent,
    HeaderComponent,
    SignInComponent,
    NoteBoardComponent,
    EditComponent,
    NoteDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    GalleriaModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ScrollerModule,
    QuillModule,
    FileUploadModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
