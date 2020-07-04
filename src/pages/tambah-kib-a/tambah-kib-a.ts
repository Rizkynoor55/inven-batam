import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,LoadingController  } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http} from '@angular/http';

/**
 * Generated class for the TambahKibAPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tambah-kib-a',
  templateUrl: 'tambah-kib-a.html',
})
export class TambahKibAPage  {
   items : any = [];
  public form                   : FormGroup;
  public nama_aset              : any;
  public kode_aset              : any;
  public register               : any;
  public luas                   : any;
  public tahun_pengadaan        : any;
  public alamat                 : any;
  public status_tanah           : any;
  public tanggal_sertifikat     : any;
  public nomor_sertifikat       : any;  
  public asal_usul             : any;
  public harga                 : any;
  public keterangan            : any;
  public kode_lokasi           : any;



 
  // Initialise module classes
  constructor(public navCtrl    : NavController,
              public http       : Http,
              public NP         : NavParams,
              public fb         : FormBuilder,
              public toastCtrl  : ToastController,
              public navParams : NavParams,
              public loading: LoadingController)
  {
   this.load_aset();
  



     // Create form builder validation rules
     this.form = this.fb.group({
    

      "nama_aset"             :  ["", Validators.required],
      "kode_aset"             :  ["", Validators.required],
      "register"              :  ["", Validators.compose([Validators.minLength(5),Validators.maxLength(5),Validators.pattern("^[0-9]*$"), Validators.required])],
      "luas"                  :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
      "tahun_pengadaan"       :  ["", Validators.compose([Validators.maxLength(4),Validators.minLength(4), Validators.min(1990), Validators.max(new Date().getFullYear()-1),
         Validators.required, Validators.pattern("^[0-9]*$")])],
      "alamat"                :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
      "status_tanah"          :  ["", Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      "tanggal_sertifikat"    :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
      "no_sertifikat"         :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
      "asal_usul"             :  ["", Validators.compose([Validators.minLength(5), Validators.required])],
      "harga"                 :  ["", Validators.compose([Validators.minLength(1), Validators.min(1), Validators.required])],
      "keterangan"            :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
      "kode_lokasi"           :  ["", Validators.required],

     });
  }

  load_aset(){
   let loader = this.loading.create({
      content: 'Processing please wait...',
    });

   loader.present().then(() => {
   this.http.get('http://192.168.1.1/api/api.php?command=AsetKibA')
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

  // Determine whether we adding or editing a record55555
  // based on any supplied navigation parameters
  ionViewWillEnter()
  {

  }



  // Assign the navigation retrieved data to properties
  // used as models on the page's HTML form
  selectEntry(item)
  {
     this.nama_aset           = item.nama_aset;
     this.kode_aset           = item.kode_aset;
     this.register            = item.register;
     this.luas                = item.luas;
     this.tahun_pengadaan     = item.tahun_pengadaan;
      this.alamat             = item.alamat;
      this.status_tanah       =item.status_tanah;
      this.tanggal_sertifikat =item.tanggal_sertifikat
      this.nomor_sertifikat   =item.nomor_sertifikat

     
     this.asal_usul           = item.asal_usul;
    
     this.harga            = item.harga;
    
     this.keterangan       = item.keterangan;
     this.kode_lokasi      = item.kode_lokasi;
  
  }



  // Save a new record that has been added to the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of create followed by the key/value pairs
  // for the record data
  createEntry(kode_aset, register,nama_aset,luas,alamat,status_tanah,tahun_pengadaan,tanggal_sertifikat,
    no_sertifikat,asal_usul,harga,keterangan,kode_lokasi)
  {
   let loader = this.loading.create({
      content: 'Processing please wait...',
    });
    loader.present().then(() => {
      let fn_nama_aset=this.nama_aset.substring(0, this.nama_aset.indexOf("_"));
      
      this.http.get('http://192.168.1.1/api/api.php?command=TambahKibA&kode_aset='+this.kode_aset+'&register='+this.register+'&nama_aset='+fn_nama_aset+'&luas='+this.luas+
      '&alamat='+this.alamat+'&status_tanah='+this.status_tanah+'&tahun_pengadaan='+this.tahun_pengadaan+'&tanggal_sertifikat='+this.tanggal_sertifikat+'&no_sertifikat='+
      this.nomor_sertifikat+'&asal_usul='+this.asal_usul+'&harga='+this.harga+'&keterangan='+this.keterangan+'&kode_lokasi='+this.kode_lokasi)
      .timeout(15000)
      .subscribe((success)=>{
      loader.dismiss();
      const toast = this.toastCtrl.create({
         message: "Sukses menambahkan asset",
         showCloseButton:true,
         closeButtonText:"Tutup",
         duration:5000
       });
       toast.present();
       this.navCtrl.pop();
       
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

  // Handle data submitted from the page's HTML form
  // Determine whether we are adding a new record or amending an
  // existing record
  save()
  {
  
     let nama_aset            : string = this.form.controls["nama_aset"].value, 
        kode_aset             : string = this.form.controls["kode_aset"].value,
         register             : string = this.form.controls["register"].value, 
         luas                 : string = this.form.controls["luas"].value,
         tahun_pengadaan      : string = this.form.controls["tahun_pengadaan"].value,
         alamat               : string = this.form.controls["alamat"].value,
         status_tanah         : string = this.form.controls["status_tanah"].value,
         tanggal_sertifikat   : string = this.form.controls["tanggal_sertifikat"].value,
         no_sertifikat        : string = this.form.controls["no_sertifikat"].value,
         asal_usul            : string = this.form.controls["asal_usul"].value,
         harga                : string = this.form.controls["harga"].value,
         keterangan           : string = this.form.controls["keterangan"].value,
         kode_lokasi          : string = this.form.controls["kode_lokasi"].value;

        this.createEntry(kode_aset, register,nama_aset,luas,alamat,status_tanah,tahun_pengadaan,tanggal_sertifikat,
          no_sertifikat,asal_usul,harga,keterangan,kode_lokasi);
  }

setKodeBarang(){
      let kode = this.nama_aset.split("_").pop(); 
      this.kode_aset=kode;
      this.kode_lokasi=localStorage.getItem('kode_lokasi')
   
}


}