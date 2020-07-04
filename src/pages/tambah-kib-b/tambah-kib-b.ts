import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,LoadingController  } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http } from '@angular/http';
/**
 * Generated class for the TambahKibBPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tambah-kib-b',
  templateUrl: 'tambah-kib-b.html',
})
export class TambahKibBPage {
   items : any = [];
  public form                   : FormGroup;
  public kode_aset              : any;
  public register               : any;
  public nama_aset              : any;
  public merk                   : any;
  public ukuran                 : any;
  public bahan                  : any;

  public tahun_pengadaan       : any;
  public lokasi                : any;
  public pabrik                : any;
  public no_rangka             : any;
  public no_mesin              : any;
  public no_polisi             : any;

  public bpkb                  : any;
  public asal_usul             : any;
  public penggunaan            : any;
  public harga                 : any;
  public kondisi               : any;
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
      
      "merk"                  :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
      "ukuran"                :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
      "bahan"                 :  ["", Validators.compose([Validators.minLength(1), Validators.required, Validators.pattern('[a-zA-Z ]*')])],
    
      "tahun_pengadaan"       :  ["", Validators.compose([Validators.maxLength(4),Validators.minLength(4), Validators.min(1990), Validators.max(new Date().getFullYear()-1),
                                   Validators.required, Validators.pattern("^[0-9]*$")])],
      "lokasi"                :  ["", Validators.compose([Validators.minLength(4), Validators.required])],
      "pabrik"                :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
      "no_rangka"             :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
      "no_mesin"              :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
      "no_polisi"             :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
      
     

      "bpkb"                  :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
      "asal_usul"             :  ["", Validators.compose([Validators.minLength(5), Validators.required])],
      "penggunaan"            :  ["", Validators.compose([Validators.minLength(5), Validators.required])],
      "harga"                 :  ["", Validators.compose([Validators.minLength(1), Validators.min(1), Validators.required])],
      "kondisi"               :  ["", Validators.required],
      "keterangan"            :  ["", Validators.compose([Validators.minLength(1), Validators.required])],
      "kode_lokasi"           :  ["", Validators.required],

     });
  }

  load_aset(){
   let loader = this.loading.create({
      content: 'Processing please wait...',
    });

   loader.present().then(() => {
   this.http.get('http://192.168.1.1/api/api.php?command=AsetKibB')
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
     this.kode_aset       = item.kode_aset;
     this.register        = item.register;
     this.nama_aset       = item.nama_aset;
     this.merk            = item.merk;
     this.ukuran          = item.ukuran;
     this.bahan           = item.bahan;

     this.tahun_pengadaan       = item.tahun_pengadaan;
     this.lokasi                = item.lokasi;
     this.pabrik                = item.pabrik;
     this.no_rangka             = item.no_rangka;
     this.no_mesin              = item.no_mesin;
     this.no_polisi             = item.no_polisi;

     this.bpkb             = item.bpkb;
     this.asal_usul        = item.asal_usul;
     this.penggunaan       = item.penggunaan;
     this.harga            = item.harga;
     this.kondisi          = item.kondisi;
     this.keterangan       = item.keterangan;
     this.kode_lokasi      = item.kode_lokasi;
  
  }



  // Save a new record that has been added to the page's HTML form
  // Use angular's http post method to submit the record data
  // to our remote PHP script (note the body variable we have created which
  // supplies a variable of key with a value of create followed by the key/value pairs
  // for the record data
  createEntry(kode_aset, register,nama_aset,merk,ukuran,bahan,tahun_pengadaan,lokasi,
    pabrik,no_rangka,no_mesin,no_polisi,bpkb,asal_usul,penggunaan,harga,kondisi,keterangan,kode_lokasi)
  {
   let loader = this.loading.create({
      content: 'Processing please wait...',
    });
    loader.present().then(() => {
      let fn_nama_aset=this.nama_aset.substring(0, this.nama_aset.indexOf("_"));
      
      this.http.get('http://192.168.1.1/api/api.php?command=TambahKibB&kode_aset='+this.kode_aset+'&register='+this.register+'&nama_aset='+fn_nama_aset+'&merk='+this.merk+
      '&ukuran='+this.ukuran+'&bahan='+this.bahan+'&tahun_pengadaan='+this.tahun_pengadaan+'&lokasi='+this.lokasi+'&pabrik='+this.pabrik+'&no_rangka='+this.no_rangka+'&no_mesin='+this.no_mesin+
      '&no_polisi='+this.no_polisi+'&bpkb='+this.bpkb+'&asal_usul='+this.asal_usul+'&penggunaan='+this.penggunaan+'&harga='+this.harga+'&kondisi='+this.kondisi+'&keterangan='+this.keterangan+
      '&kode_lokasi='+this.kode_lokasi)
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
  
     let kode_aset            : string = this.form.controls["kode_aset"].value,
         register             : string = this.form.controls["register"].value,
         nama_aset            : string = this.form.controls["nama_aset"].value,
         merk                 : string = this.form.controls["merk"].value,
         ukuran               : string = this.form.controls["ukuran"].value,
         bahan                : string = this.form.controls["bahan"].value,
         tahun_pengadaan      : string = this.form.controls["tahun_pengadaan"].value,
         lokasi               : string = this.form.controls["lokasi"].value,
         pabrik               : string = this.form.controls["pabrik"].value,
         no_rangka            : string = this.form.controls["no_rangka"].value,
         no_mesin             : string = this.form.controls["no_mesin"].value,
         no_polisi            : string = this.form.controls["no_polisi"].value,
         bpkb                 : string = this.form.controls["bpkb"].value,
         asal_usul            : string = this.form.controls["asal_usul"].value,
         penggunaan           : string = this.form.controls["penggunaan"].value,
         harga                : string = this.form.controls["harga"].value,
         kondisi              : string = this.form.controls["kondisi"].value,
         keterangan           : string = this.form.controls["keterangan"].value,
         kode_lokasi          : string = this.form.controls["kode_lokasi"].value;


        this.createEntry(kode_aset, register,nama_aset,merk,ukuran,bahan,tahun_pengadaan,lokasi,
          pabrik,no_rangka,no_mesin,no_polisi,bpkb,asal_usul,penggunaan,harga,kondisi,keterangan,kode_lokasi);
  }

setKodeBarang(){
      let kode = this.nama_aset.split("_").pop(); 
      this.kode_aset=kode;
      this.kode_lokasi=localStorage.getItem('kode_lokasi')
   
}


}