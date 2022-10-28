import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { HistoryModalPage } from 'src/app/history-modal/history-modal.page';
import { HistoryService, Note } from 'src/app/services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  notes: Note[] = [];

  constructor(private historyService: HistoryService,  private cd: ChangeDetectorRef, private alertCtrl: AlertController, private modalCtrl: ModalController) { 
    this.historyService.getNotes().subscribe( res => {
      this.notes = res;
      this.cd.detectChanges();
    });
  }

  async addNote() {
    const alert = await this.alertCtrl.create({
      header: 'Add Medical History',
      inputs: [
        {
          name: 'title',
          placeholder: 'Enter Condition',
          type: 'text'
        },
        {
          name: 'text',
          placeholder: 'description',
          type: 'textarea'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Add',
          handler: res => {
            this.historyService.addNote({ text: res.text, title: res.title });
          }
        }
      ]
    });

    await alert.present();
  }

  async openNote(note: Note) {
    const modal = await this.modalCtrl.create({
      component: HistoryModalPage,
      componentProps: { id: note.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });

    await modal.present();
  }

  ngOnInit() {
  }

}
