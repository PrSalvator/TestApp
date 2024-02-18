import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Note } from '../models/note';
import { Image } from '../models/image';
import { ActivatedRoute} from "@angular/router";
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.css'
})
export class NoteDetailsComponent implements OnInit{
  @Input() header = "";
  @Input() text = "";
  @Input() images: Image[] = [];
  isEdit:boolean = false;
  uploadedFiles: File[] = [];
  userId: string = "";
  noteId: string = "";

  constructor(private dataService:DataService, private router:Router, private route: ActivatedRoute){
    this.userId = dataService.getUserId();
  }

  async create(){
    this.uploadedFiles.forEach(async f => {
      await this.uploadImage(f);
    })
    const note = new Note(this.userId, new Date(), this.header, this.text, this.images);
    this.router.navigate(["/note-board"]);
    this.dataService.createNewNote(note);
  }
  async save(){
    await this.uploadedFiles.forEach(f => {
      this.uploadImage(f);
    })
    console.log(this.images, "images before paste into note");
    const note = new Note(this.userId, new Date(), this.header, this.text, this.images);
    this.router.navigate(["/note-board"]);
    this.dataService.updateNote(note, this.noteId);
  }

  deleteFile(fileName:string){
    this.uploadedFiles.splice(this.uploadedFiles.findIndex(n => n.name === fileName), 1);
  }
  deleteImage(src:string){
    this.dataService.deleteImage(src);
    this.images.splice(this.images.findIndex(n => n.src === src), 1);
  }
  onUpload(event:any) {
    event.files.forEach((file:File) => {
      this.uploadedFiles.push(file);
    });
  }
  async uploadImage(file:File){
    const src = await this.dataService.uploadImage(file);
    console.log(src, " image src");
    this.images.push(new Image(src, file.name));
    console.log(file.name, "paste into images");
  }

  quillConfig={
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        
        [{ 'header': 1 }, { 'header': 2 }],              
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      
        [{ 'indent': '-1'}, { 'indent': '+1' }],          
        [{ 'direction': 'rtl' }],                        

        [{ 'size': ['small', false, 'large', 'huge'] }], 
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'],                                        
      ],
      
    }
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll("noteId"))
  )
  .subscribe(data=> 
    {
      this.dataService.getNote(data).then((n) => {
        if(n){
          this.noteId = n.id;
          this.isEdit = true;
          this.header = n.header;
          this.text = n.text;
          this.images = n.images;
        }
      });
      
    });
  }
}
