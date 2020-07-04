import {Http, Headers,RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import { LoadingController,ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';



let apiUrl = 'http://localhost/api/api-login/'; // api 

@Injectable()
export class AuthServiceProvider {

  constructor(public http : Http,public loadingCtrl:LoadingController,public toastCtrl:ToastController) {
    console.log('Hello AuthService Provider');
  }

   postData(credentials, type) {
      let loading = this.loadingCtrl.create({
      content: 'Meminta data ke server..'
      });
      loading.present();
        return new Promise((resolve, reject) => {
    
    
          let headers = new Headers();         
          headers.append('Content-Type', 'application/json');
          
          let options = new RequestOptions({ headers: headers });
  
          this.http.post(apiUrl + type, JSON.stringify(credentials), options)
              .timeout(25000)
              .subscribe(res => {
              resolve(res.json());
              loading.dismiss();
            }, (err) => {
              console.log(err);
              reject(err);
              loading.dismiss();
              const toast = this.toastCtrl.create({
                message: "Server tidak aktif. Periksa koneksi internet Anda atau Hubungi bidang Informasi.",
                showCloseButton:true,
                closeButtonText:"Tutup",
                duration:10000
              });
              toast.present();
            
            });
        });
     
      }

}
