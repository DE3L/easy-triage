import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Information {
  id?: string;
  firstname: string;
  lastname: string;
  address: string;
  birthdate: Date;
  phone: number;
  sss: string;
  tin: string;
}

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private firestore: Firestore) { }

  getInfo(): Observable<Information[]> {
    const infoRef = collection(this.firestore, 'basic_info');
    return collectionData(infoRef, {idField: 'id'}) as Observable<Information[]>;
  }

  getInfoById(id): Observable<Information> {
    const infoDocRef = doc(this.firestore, `basic_info/${id}`);
    return docData(infoDocRef, {idField: 'id'}) as Observable<Information>;
  }

  addInfo(info: Information) {
    const infoRef = collection(this.firestore, 'basic_info');
    return addDoc(infoRef, info);
  }

  updateInfo(info: Information) {
    const infoDocRef = doc(this.firestore, `basic_info/${info.id}`);
    return updateDoc(infoDocRef, { firstname: info.firstname, lastname: info.lastname, address: info.address, birthdate: info.birthdate, phone: info.phone, sss: info.sss, tin: info.tin });

  }

}
