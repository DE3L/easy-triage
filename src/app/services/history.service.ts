import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Note {
  id?: string;
  title: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private firestore: Firestore) { }

  getNotes(): Observable<Note[]> {
    const notesRef = collection(this.firestore, 'medhistory');
    return collectionData(notesRef, { idField: 'id'}) as Observable<Note[]>;
  }

  getNoteById(id): Observable<Note> {
    const noteDocRef = doc(this.firestore, `medhistory/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<Note>;
  }

  addNote(note: Note) {
    const notesRef = collection(this.firestore, 'medhistory');
    return addDoc(notesRef, note);
  }

  deleteNote(note: Note) {
    const noteDocRef = doc(this.firestore, `medhistory/${note.id}`);
    return deleteDoc(noteDocRef);
  }

  updateNote(note: Note) {
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return updateDoc(noteDocRef, { title: note.title, text: note.text });
  }
}
