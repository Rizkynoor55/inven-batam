import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,LoadingController  } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http } from '@angular/http';
/**
 * Generated class for the TambahKibCPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tambah-kib-c',
  templateUrl: 'tambah-kib-c.html',
})
export class TambahKibCPage {
   items : any = [];
  public form                   : FormGroup;
  public nama_aset              : any;
  public kode_aset              : any;
  public register               : any;
  public bertingkat                   : any;
  public beton_tidak                   : any;
  public luas_lantai                   : any;
  public tahun_pengadaan        : any;
  public alamat                 : any;
  public nomor_dokumen        :any;
  public tanggal_dokumen        :any;
  public status_tanah           : any;
  public nomor_kode_tanah       : any;
  public luas_tanah             : any;  
  public asal_usul             : any;
  public harga                 : any;
  public keterangan            : any;
  public kondisi            : any;
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
      "kondisi"               :  ["", Validators.required],
      "bertingkat"            :  ["", Validators.required],
      "beton_tidak"           :  ["", Validators.required],

      "luas_lantai"           :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
      "tahun_pengadaan"       :  ["", Validators.compose([Validators.maxLength(4),Validators.minLength(4), Validators.min(1990), Validators.max(new Date().getFullYear()-1),
         Validators.required, Validators.pattern("^[0-9]*$")])],
      "alamat"                :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
      "nomor_dokumen"         :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
      "tanggal_dokumen"       :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
      "status_tanah"          :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
      "nomor_kode_tanah"      :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
      "luas_tanah"            :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
   
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
   this.http.get('http://192.168.1.1/api/api.php?command=AsetKibC')
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
     this.kondisi             =item.kondisi,
     this.bertingkat          =item.bertingkat,
     this.beton_tidak         =item.beton_tidak,
     this.luas_lantai                = item.luas_lantai;
     this.tahun_pengadaan     = item.tahun_pengadaan;
      this.alamat             = item.alamat;
      this.nomor_dokumen       =item.nomor_dokumen;
      this.tanggal_dokumen =item.tanggal_dokumen,
      this.status_tanah   =item.status_tanah,
      this.nomor_kode_tanah=item.nomor_kode_tanah,
      this.luas_tanah=item.luas_tanah,
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
  createEntry(kode_aset, register,nama_aset,kondisi,bertingkat,beton_tidak,luas_lantai,tahun_pengadaan,alamat,nomor_dokumen,tanggal_dokumen,status_tanah,nomor_kode_tanah,luas_tanah
    ,asal_usul,harga,keterangan,kode_lokasi)
  {
   let loader = this.loading.create({
      content: 'Processing please wait...',
    });
    loader.present().then(() => {
      let fn_nama_aset=this.nama_aset.substring(0, this.nama_aset.indexOf("_"));
      
      this.http.get('http://192.168.1.1/api/api.php?command=TambahKibC&kode_aset='+this.kode_aset+'&register='+this.register+'&nama_aset='+fn_nama_aset+'&kondisi='+this.kondisi+
      '&bertingkat='+this.bertingkat+'&beton_tidak='+this.beton_tidak+'&luas_lantai='+this.luas_lantai+
      '&tahun_pengadaan='+this.tahun_pengadaan+'&alamat='+this.alamat+'&nomor_dokumen='+this.nomor_dokumen+'&tanggal_dokumen='+this.tanggal_dokumen+'&status_tanah='+
      this.status_tanah+'&nomor_kode_tanah='+this.nomor_kode_tanah+'&luas_tanah='+this.luas_tanah+'&asal_usul='+this.asal_usul+'&harga='+this.harga+'&keterangan='+this.keterangan+'&kode_lokasi='+this.kode_lokasi)
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
         kondisi                 : string = this.form.controls["kondisi"].value,
         tahun_pengadaan      : string = this.form.controls["tahun_pengadaan"].value,
         alamat               : string = this.form.controls["alamat"].value,
         status_tanah         : string = this.form.controls["status_tanah"].value,
         bertingkat   : string = this.form.controls["bertingkat"].value,
         beton_tidak        : string = this.form.controls["beton_tidak"].value,
         luas_lantai        : string = this.form.controls["luas_lantai"].value,
         nomor_dokumen        : string = this.form.controls["nomor_dokumen"].value,
         tanggal_dokumen       : string = this.form.controls["tanggal_dokumen"].value,
         nomor_kode_tanah        : string = this.form.controls["nomor_kode_tanah"].value,
         luas_tanah        : string = this.form.controls["luas_tanah"].value,
         asal_usul            : string = this.form.controls["asal_usul"].value,
         harga                : string = this.form.controls["harga"].value,
         keterangan           : string = this.form.controls["keterangan"].value,
         kode_lokasi          : string = this.form.controls["kode_lokasi"].value;

        this.createEntry(kode_aset, register,nama_aset,kondisi,bertingkat,beton_tidak,luas_lantai,tahun_pengadaan,alamat,nomor_dokumen,tanggal_dokumen,status_tanah,nomor_kode_tanah,luas_tanah
         ,asal_usul,harga,keterangan,kode_lokasi)
  }

setKodeBarang(){
      let kode = this.nama_aset.split("_").pop(); 
      this.kode_aset=kode;
      this.kode_lokasi=localStorage.getItem('kode_lokasi')
   
}


}