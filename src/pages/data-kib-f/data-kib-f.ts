import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController,AlertController } from 'ionic-angular';

import { Http } from '@angular/http';
/**
 * Generated class for the DataKibFPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-data-kib-f',
  templateUrl: 'data-kib-f.html',
})
export class DataKibFPage {

  items : any = [];
  
  kode_lokasi:String;
  
  data_user:any=JSON.parse(localStorage.getItem('userData'))
  Tanggal: String = new Date().toISOString().substring(0, 10);

constructor(public navCtrl: NavController,public navParams: NavParams,
       public http : Http,public toastCtrl:ToastController,public loading:LoadingController,public alertCtrl:AlertController)
{
   
}
  
ionViewDidEnter()
{
 
    this.load();
}
load(){

   this.kode_lokasi = this.navParams.get('kode_lokasi');

   let loader = this.loading.create({
      content: 'Processing please wait...',
    });

   loader.present().then(() => {
   this.http.get('http://localhost/api/api.php?command=TampilKibF&kd_lokasi='+this.kode_lokasi)
   .timeout(15000)
   .map(res => res.json())
  .subscribe((success)=>{
   
   loader.dismiss()
  this.items=success
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

CariAset(event) {
       
     const val = event.target.value;
   console.log(val)
   if (val && val.trim() != "") {
    this.items = this.items.filter((item) => {
    return (item.nama_aset.toLowerCase().indexOf(val.toLowerCase()) > -1 || 
    item.id_aset.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.asal_usul.toLowerCase().indexOf(val.toLowerCase()) > -1);
    
  })
}else{
  this.load()
}    
}

  
 tambah_kib_f(param)
 {
    this.navCtrl.push('TambahKibFPage',param);
 }


 


 VerifKibF(id_aset,kode_lokasi)
 {
   let alert = this.alertCtrl.create({
      title: 'Konfirmasi Verifikasi Aset',
      message: 'Anda yakin ingin memverifikasi aset ini?',
      buttons: [
          {
              text: 'No',
              handler: () => {
                  
              }
          },
          {
              text: 'Yes',
              handler: () => {
               loader.present().then(() => {
                  this.http.get('http://192.168.1.1/api/api.php?command=VerifKibF&kd_lokasi='+kode_lokasi+'&id_aset='+id_aset+'&verifikator='+this.data_user.nama+'&tgl_verifikasi='+this.Tanggal)
                  .timeout(15000)
                  .subscribe((success)=>{
                  loader.dismiss();
                  const toast = this.toastCtrl.create({
                     message: "Sukses melakukan verifikasi",
                     
                     duration:2000
                   });
                   toast.present();
                   this.load();
                 },(error)=>{
                    console.log(error)
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
          }
      ]
  })
  alert.present();
   let loader = this.loading.create({
      content: 'Processing please wait...',
    });

  
 }

 BatalVerifKibF(id_aset,kode_lokasi)
 {
   let alert = this.alertCtrl.create({
      title: 'Konfirmasi Pembatalan Verifikasi Aset',
      message: 'Anda yakin ingin membatalkan verifikasi aset ini?',
      buttons: [
          {
              text: 'No',
              handler: () => {
                  
              }
          },
          {
              text: 'Yes',
              handler: () => {
               loader.present().then(() => {
                  this.http.get('http://192.168.1.1/api/api.php?command=BatalVerifKibF&kd_lokasi='+kode_lokasi+'&id_aset='+id_aset+'&verifikator='+this.data_user.nama+'&tgl_verifikasi='+this.Tanggal)
                  .timeout(15000)
                  .subscribe((success)=>{
                  loader.dismiss();
                  const toast = this.toastCtrl.create({
                     message: "Sukses melakukan verifikasi",
                     
                     duration:2000
                   });
                   toast.present();
                   this.load();
                 },(error)=>{
                    console.log(error)
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
          }
      ]
  })
  alert.present();
   let loader = this.loading.create({
      content: 'Processing please wait...',
    });

  
 }










}
