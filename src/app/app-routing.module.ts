import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { NoteBoardComponent } from './note-board/note-board.component';
import { EditComponent } from './edit/edit.component';
import { NoteDetailsComponent } from './note-details/note-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent},
  { path: 'note-board', component: NoteBoardComponent},
  { path: 'edit/:noteId', component: NoteDetailsComponent},
  { path: 'create', component: NoteDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
