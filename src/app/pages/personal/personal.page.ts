import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { InfoService, Information } from 'src/app/services/info.service';
import { InfoModalPage } from 'src/app/info-modal/info-modal.page';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {

  infos = [];
  info: Information[] = [];

  constructor(private infoService: InfoService, private cd: ChangeDetectorRef, private alertCtrl: AlertController, private modalCtrl: ModalController ) { 
    this.infoService.getInfo().subscribe(res => {
      console.log(res);
      this.infos = res;
      this.cd.detectChanges();
    });
  }

  async addInfo() {
    const alert = await this.alertCtrl.create({
      header: 'Add Your Personal Information',
      inputs: [
        {
          name: 'firstname',
          placeholder: 'First Name',
          type: 'text'
        },
        {
          name: 'lastname',
          placeholder: 'Last Name',
          type: 'text'
        },
        {
          name: 'address',
          placeholder: 'Address',
          type: 'text'
        },
        {
          name: 'birthdate',
          placeholder: 'Birthdate',
          type: 'date'
        },
        {
          name: 'phone',
          placeholder: 'Mobile Number',
          type: 'number'
        },
        {
          name: 'sss',
          placeholder: 'SSS Number (type N/A if none)',
          type: 'text'
        },
        {
          name: 'tin',
          placeholder: 'SSS Number (type N/A if none)',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Add',
          handler: res => {
            this.infoService.addInfo({
              firstname: res.firstname,
              lastname: res.lastname,
              address: res.address,
              birthdate: res.birthdate,
              phone: res.phone,
              sss: res.sss,
              tin: res.tin
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async openInfo(info: Information) {
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      componentProps: {id: info.id},
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.9
    });

    await modal.present();
  }

  ngOnInit() {
   

  }

  

}
