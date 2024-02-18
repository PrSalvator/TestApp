import { Injectable} from '@angular/core';
import { getAuth , onAuthStateChanged } from "firebase/auth";
import { environment } from '../../environments/environment';
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { doc, collection, addDoc, updateDoc, deleteDoc, getDocs, getDoc, query, where} from "firebase/firestore";
import { getStorage, ref, uploadBytes, deleteObject} from "firebase/storage";

import { Note } from '../models/note';
import { Image } from '../models/image';
import { notEqual } from 'assert';
import { stringify } from 'querystring';

const dbPath = "notes";

@Injectable({
  providedIn: 'root'
})

export class DataService {

  db:Firestore;

  constructor(){
    const app = initializeApp(environment.firebaseConfig);
    this.db = getFirestore(app);
  }
  

  getUserId(): any{
    const auth = getAuth();
    return auth.currentUser?.uid;
  }

  async createNewNote(note:Note){
    const noteRef = await addDoc(collection(this.db, dbPath), 
    {
      userId: note.userId,
      date: note.date,
      header: note.header,
      text: note.text,
      images: JSON.stringify(note.images)
    });

    updateDoc(doc(this.db, dbPath, noteRef.id), {
      id: noteRef.id
    });
  }

  updateNote(note:Note, noteId:string){
    const noteRef = doc(this.db, dbPath, noteId);
    console.log(note.images, " images in dataservice")
    updateDoc(noteRef, {
      date: note.date,
      header: note.header,
      text: note.text,
      images: JSON.stringify(note.images)
    });
  }
  deleteNote(noteId:string){
    const noteRef = doc(this.db, dbPath, noteId);
    deleteDoc(noteRef);
  }

  uploadImage(image:File){
    const storage = getStorage();
    const storageRef = ref(storage, image.name + this.generateRandomString());
    uploadBytes(storageRef, image);
    return storageRef.fullPath;
  }
  deleteImage(src:string){
    const storage = getStorage();
    // Create a reference to the file to delete
    const deleteRef = ref(storage, src);
    deleteObject(deleteRef);
  }
  generateRandomString(length = 15) {
    return Math.random().toString(36).substring(2, length + 2);
  }
  async getAll(userId:string){
    const q = query(collection(this.db, dbPath), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const notes: Note[] = [];
    querySnapshot.forEach((doc) => {
      const note = new Note(doc.data()['userId'], doc.data()['date'], doc.data()['header'], doc.data()['text'], JSON.parse(doc.data()['images']));
      note.id = doc.id;
      notes.push(note);
    });
    console.log(notes, " notes before return")
    return notes;
  }
  async getNote(noteId:string){
    const docRef = doc(this.db, dbPath, noteId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const note = new Note(docSnap.data()['userId'], docSnap.data()['date'], docSnap.data()['header'], docSnap.data()['text'], JSON.parse(docSnap.data()['images']));
      note.id = docSnap.data()['id'];
      return note;
    } 
    return undefined;
  }
}
