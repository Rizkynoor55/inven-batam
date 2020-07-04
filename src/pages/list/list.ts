import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , App, ModalController,AlertController,ViewController } from 'ionic-angular';


import { VerifikasiPage } from '../verifikasi/verifikasi';
import { LoginPage } from '../login/login';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {HasilScanPage} from '../hasil-scan/hasil-scan';
/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
 
  data_object="";
  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, public app: App, 
    public ModalController:ModalController,private alertCtrl: AlertController,public viewCtrl:ViewController) {
     
  }

  ionViewDidLoad() {
    console.log(localStorage.getItem('userData'));


  }

  ErrorAlert() {
    let alert = this.alertCtrl.create({
      title: 'Kesalahan',
      subTitle: 'QR Code yang Anda Scan tidak sesuai format',
      buttons: [
        {
          text: 'Oke'
        }
      ]
    });

    alert.present();
  }

  goToqrcode() {
    let options= {
      prompt : "Arahkan QRCode di dalam frame",
      preferFrontCamera : false, // iOS and Android
      showFlipCameraButton : true, // iOS and Android
      showTorchButton : true, // iOS and Android
      torchOn: false, // Android, launch with the torch switched on (if available)
    
      resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      
      orientation : "potrait",
      }
    
    this.barcodeScanner.scan(options).then(barcodeData => {
      if(barcodeData.cancelled){
        this.navCtrl.pop();
      }else{

        try {
          this.data_object = JSON.parse(barcodeData.text);
          let myModal = this.ModalController.create(HasilScanPage, { 'DataScan': barcodeData.text });
          myModal.present();
      } catch(e) {
          this.navCtrl.pop();
          this.ErrorAlert();
          
      }

    }}, (err) => {
        console.log('Error: ', err);
    });
  }

  goToverifikasi() {
    this.navCtrl.push(VerifikasiPage);
    }   

          
  logout(){
   localStorage.clear();
   this.navCtrl.setRoot(LoginPage,{},{animate:true,duration:800})
    }
}
