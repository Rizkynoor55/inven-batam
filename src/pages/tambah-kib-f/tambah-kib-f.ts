import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,LoadingController  } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http} from '@angular/http';

/**
 * Generated class for the TambahKibFPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tambah-kib-f',
  templateUrl: 'tambah-kib-f.html',
})
export class TambahKibFPage {
   items : any = [];
   public form                   : FormGroup;
   public nama_aset              : any;
   public kode_aset              : any;
   public bangunan               : any;
   public bertingkat_tidak                : any;
   public beton_tidak                   : any;
   public luas                   : any;
   public alamat                   : any;
   public tanggal_dokumen        :any;
   public nomor_dokumen        :any;
   public tahun_bulan_mulai : any;
   public nomor_kode_tanah        : any;
   public nilai_kontrak        : any;
   public asal_usul_pembiayaan        : any;
   public status_tanah        : any;   
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
       "bangunan"              :  ["", Validators.required],
       "bertingkat_tidak"      :  ["", Validators.required],
       "beton_tidak"           :  ["", Validators.required],
       "luas"                  :  ["", Validators.required],
       "alamat"                :  ["", Validators.required],
       "tanggal_dokumen"       :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
       "nomor_dokumen"         :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
       "tahun_bulan_mulai"     :  ["", Validators.compose([Validators.maxLength(4),Validators.minLength(4), Validators.min(1990), Validators.max(new Date().getFullYear()-1),
                                  Validators.required, Validators.pattern("^[0-9]*$")])],
       "nomor_kode_tanah"      :  ["", Validators.required],
       "nilai_kontrak"         :  ["", Validators.compose([Validators.minLength(1), Validators.min(1), Validators.required])],
       "asal_usul_pembiayaan"  :  ["", Validators.compose([Validators.minLength(5), Validators.required])],
       "status_tanah"          :  ["", Validators.required],
       "keterangan"            :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
       "kode_lokasi"           :  ["", Validators.required],
 
      });
   }
 
   load_aset(){
    let loader = this.loading.create({
       content: 'Processing please wait...',
     });
 
    loader.present().then(() => {
    this.http.get('http://192.168.1.1/api/api.php?command=AsetKibF')
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
      this.bangunan            = item.register;
      this.bertingkat_tidak            = item.judul_buku;
      this.beton_tidak          =item.spesifikasi_buku;
      this.luas          =item.spesifikasi_buku;
      this.alamat          =item.alamat;
      this.tanggal_dokumen =item.tanggal_dokumen,
      this.nomor_dokumen       =item.nomor_dokumen;
      this.tahun_bulan_mulai     = item.tahun_bulan_mulai;
      this.nomor_kode_tanah     = item.nomor_kode_tanah;
      this.nilai_kontrak            = item.nilai_kontrak;
      this.asal_usul_pembiayaan           = item.asal_usul_pembiayaan;
      this.status_tanah             =item.status_tanah;
      this.keterangan       = item.keterangan;
      this.kode_lokasi      = item.kode_lokasi;

   }
 
 
 
   // Save a new record that has been added to the page's HTML form
   // Use angular's http post method to submit the record data
   // to our remote PHP script (note the body variable we have created which
   // supplies a variable of key with a value of create followed by the key/value pairs
   // for the record data
   createEntry(nama_aset,kode_aset,bangunan,bertingkat_tidak,beton_tidak,luas,alamat,tanggal_dokumen,nomor_dokumen,tahun_bulan_mulai,nomor_kode_tanah,nilai_kontrak,
    asal_usul_pembiayaan,status_tanah,keterangan,kode_lokasi)
   {
    let loader = this.loading.create({
       content: 'Processing please wait...',
     });
     loader.present().then(() => {
       let fn_nama_aset=this.nama_aset.substring(0, this.nama_aset.indexOf("_"));
       
       this.http.get('http://192.168.1.1/api/api.php?command=TambahKibF&kode_aset='+this.kode_aset+'&bangunan='+this.bangunan+'&nama_aset='+fn_nama_aset+'&bertingkat_tidak='+this.bertingkat_tidak+
       '&beton_tidak='+this.beton_tidak+'&luas='+this.luas+'&alamat='+this.alamat+'&nomor_dokumen='+this.nomor_dokumen+'&tanggal_dokumen='+this.tanggal_dokumen+'&tahun_bulan_mulai='+this.tahun_bulan_mulai
       +'&nomor_kode_tanah='+this.nomor_kode_tanah+'&nilai_kontrak='+this.nilai_kontrak+'&asal_usul_pembiayaan='+this.asal_usul_pembiayaan+'&status_tanah='+this.status_tanah
       +'&keterangan='+this.keterangan+'&kode_lokasi='+this.kode_lokasi)
       .timeout(15000)
       .subscribe((success)=>{
       loader.dismiss();
       const toast = this.toastCtrl.create({
          message: "Sukses menambahkan asset",
         
          duration:2000
        });
        toast.present();
        this.navCtrl.pop();
        
      },(error)=>{
         console.log(error)
         loader.dismiss();
         const toast = this.toastCtrl.create({
          message: "Error terdeteksi : "+error+". \n Harap hubungi bidang informasi",
          
          duration:5000
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
          bangunan             : string = this.form.controls["bangunan"].value, 
          bertingkat_tidak               : string = this.form.controls["bertingkat_tidak"].value,
          tahun_bulan_mulai      : string = this.form.controls["tahun_bulan_mulai"].value,
         beton_tidak               : string = this.form.controls["beton_tidak"].value,
         luas         : string = this.form.controls["luas"].value,
         alamat         : string = this.form.controls["alamat"].value,
          nomor_dokumen        : string = this.form.controls["nomor_dokumen"].value,
          tanggal_dokumen       : string = this.form.controls["tanggal_dokumen"].value,
          asal_usul_pembiayaan            : string = this.form.controls["asal_usul_pembiayaan"].value,
          nilai_kontrak                : string = this.form.controls["nilai_kontrak"].value,
          keterangan           : string = this.form.controls["keterangan"].value,
          kode_lokasi          : string = this.form.controls["kode_lokasi"].value,
          nomor_kode_tanah          : string = this.form.controls["nomor_kode_tanah"].value,
          status_tanah          : string = this.form.controls["status_tanah"].value;
 
         this.createEntry(nama_aset,kode_aset, bangunan,bertingkat_tidak,beton_tidak,luas,alamat,tanggal_dokumen,nomor_dokumen,tahun_bulan_mulai,nomor_kode_tanah,nilai_kontrak,
            asal_usul_pembiayaan,status_tanah,keterangan,kode_lokasi)
   }
 
 setKodeBarang(){
       let kode = this.nama_aset.split("_").pop(); 
       this.kode_aset=kode;
       this.kode_lokasi=localStorage.getItem('kode_lokasi')
    
 }
 
 
 }