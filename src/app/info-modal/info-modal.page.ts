import { Component, Input, OnInit } from '@angular/core';
import { Information, InfoService } from '../services/info.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.page.html',
  styleUrls: ['./info-modal.page.scss'],
})
export class InfoModalPage implements OnInit {
  @Input() id: string;
  info: Information = null;

  constructor(private infoService: InfoService, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.infoService.getInfoById(this.id).subscribe(res => {
      this.info = res;
    });
  }

  async updateInfo() {
    await this.infoService.updateInfo(this.info);
    const toast = await this.toastCtrl.create({
      message: 'Information Updated!',
      duration: 2000
    });
    toast.present();
  }

}
