import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController ,NavParams,AlertController } from 'ionic-angular';
import { ListPage } from '../list/list';
/**
 * Generated class for the HasilScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hasil-scan',
  templateUrl: 'hasil-scan.html',
})
export class HasilScanPage {
data:any;


data_object:any;
constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController,private alertCtrl: AlertController) {

  if(this.data = navParams.get('DataScan')) {
    try {
        this.data_object = JSON.parse(this.data);
    } catch(e) {
        this.ErrorAlert();
    }
}
  
}

  ErrorAlert() {
    let alert = this.alertCtrl.create({
      title: 'Kesalahan',
      subTitle: 'QRCode yang Anda Scan tidak sesuai format',
      buttons: [
        {
          text: 'Oke',
          handler: () => {
            this.viewCtrl.dismiss();
          }
        }
      ]
    });

    alert.present();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
