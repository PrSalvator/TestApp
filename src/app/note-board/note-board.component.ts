import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Note } from '../models/note';
@Component({
  selector: 'app-note-board',
  templateUrl: './note-board.component.html',
  styleUrl: './note-board.component.css'
})
export class NoteBoardComponent implements OnInit{
  items:Note[] = [];
  constructor(private router: Router, private dataService:DataService){

  }
  create(){
    this.router.navigate(["/create"]);
  }
  ngOnInit(): void {
    this.dataService.getAll(this.dataService.getUserId()).then(e =>{
      this.items = e.sort(function(a,b){
        if(new Date(a.date).getTime() - new Date(b.date).getTime() > 0) return 1;
        if(new Date(a.date).getTime() - new Date(b.date).getTime() < 0) return -1;
        console.log('1');
        return 0;
      });
      console.log(e);
    });
  }
}
