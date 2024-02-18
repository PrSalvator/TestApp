import { Component, OnInit , Input} from '@angular/core';
import { Image } from '../models/image';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrl: './card-component.component.css'
})

export class CardComponentComponent implements OnInit{
  @Input() header: string = "";
  @Input() text: string = "";
  @Input() images: Image[] = [];
  @Input() date: Date = new Date();
  @Input() id:string = "";
  strDate:string = "";
  isVisible:boolean = false;

  constructor(private router: Router, private dataService: DataService){
    this.strDate = this.date.toDateString();
  }
  showImages() {
    this.isVisible = true;
  };
  edit(){
    if(this.id){
      this.router.navigate([`edit/${this.id}`]);
    }
  }
  delete(){
    const result = confirm("Вы действительно хотите удалить запись?");
    if(result){
      this.dataService.deleteNote(this.id);
      this.isVisible = false;
    }
  }
  ngOnInit(){}
}
