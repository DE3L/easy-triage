import { Component, Input, OnInit } from '@angular/core';
import { Note, HistoryService } from '../services/history.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.page.html',
  styleUrls: ['./history-modal.page.scss'],
})
export class HistoryModalPage implements OnInit {
  @Input() id: string;
  note: Note = null;

  constructor(private historyService: HistoryService, private modalCtrl: ModalController, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.historyService.getNoteById(this.id).subscribe(res => {
      this.note = res;
    });
  }

  async deleteNote() {
    await this.historyService.deleteNote(this.note)
    this.modalCtrl.dismiss();
  }

  async updateNote() {
    await this.historyService.updateNote(this.note);
    const toast = await this.toastCtrl.create({
      message: 'Medical History updated!.',
      duration: 2000
    });
    toast.present();

  }

}
