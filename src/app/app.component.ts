import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  text = "asd";
  title = 'TestApp';
  items = [
    {label: 'New', icon: 'pi pi-fw pi-plus'},
    {label: 'Download', icon: 'pi pi-fw pi-download'}
  ]
}
