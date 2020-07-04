import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers, RequestOptions } from '@angular/http';
import { LoadingController,ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { ListPage } from '../list/list';

/**
 * Generated class for the VerifikasiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verifikasi',
  templateUrl: 'verifikasi.html',
})
export class VerifikasiPage {
         items : any ;
         data : any ;
         nip : any ;
  constructor(public navCtrl: NavController,public navParams: NavParams,
              public http   : Http, public loading: LoadingController,public toastCtrl:ToastController){
  }


  ionViewWillEnter()
  {
     this.load();
  }

  // Retrieve the JSON encoded data from the remote server
  // Using Angular's Http class and an Observable - then
  // assign this to the items array for rendering to the HTML template
  load()
  {
   let data_user=JSON.parse(localStorage.getItem('userData'))
   
   var headers = new Headers();
   headers.append("Accept", 'application/json');
   headers.append('Content-Type', 'application/json' );
   let options = new RequestOptions({ headers: headers });

   let data = {
      nip: this.nip
    };

   let loader = this.loading.create({
      content: 'Processing please wait...',
    });

   loader.present().then(() => {
      
      this.http.post('http://localhost/api/api.php?command=TampilSkpd&nip='+data_user.nip,data, options)
      .map(res => res.json())
      .timeout(15000)
     .subscribe((success)=>{
      
      loader.dismiss()
     this.items=success.server_response;
     console.log(this.items);
     },(error)=>{
        loader.dismiss();
        const toast = this.toastCtrl.create({
         message: "Error terdeteksi : "+error+". \n Harap hubungi bidang informasi",
         showCloseButton:true,
         closeButtonText:"Tutup",
         duration:10000
       });
       toast.present();

     });
     });
      }
   
  viewKib_a(param)
  {
    localStorage.removeItem('kode_lokasi');
      this.navCtrl.push('DataKibAPage', {
      kode_lokasi: param
      });
      localStorage.setItem('kode_lokasi',param)
      
  }
  viewKib_b(param)
  {
    localStorage.removeItem('kode_lokasi');
     this.navCtrl.push('DataKibBPage', {
      kode_lokasi: param
      });
      localStorage.setItem('kode_lokasi',param)
  }
  viewKib_c(param)
  {
    localStorage.removeItem('kode_lokasi');
      this.navCtrl.push('DataKibCPage', {
      kode_lokasi: param
      });
      localStorage.setItem('kode_lokasi',param)
  }
  viewKib_d(param)
  {
    localStorage.removeItem('kode_lokasi');
      this.navCtrl.push('DataKibDPage', {
      kode_lokasi: param
      });
      localStorage.setItem('kode_lokasi',param)
  }
  viewKib_e(param)
  {
    localStorage.removeItem('kode_lokasi');
      this.navCtrl.push('DataKibEPage', {
      kode_lokasi: param
      });
      localStorage.setItem('kode_lokasi',param)
  }
  viewKib_f(param)
  {
    localStorage.removeItem('kode_lokasi');
      this.navCtrl.push('DataKibFPage', {
      kode_lokasi: param
      });
      localStorage.setItem('kode_lokasi',param)
  }
}