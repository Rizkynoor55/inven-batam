import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, List } from 'ionic-angular';
import { Validators,FormBuilder,FormGroup } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {ListPage } from '../../pages/list/list';


 
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private FormLogin:FormGroup;
  responseData : any;
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder:FormBuilder, 
    public authService:AuthServiceProvider, public toastCtrl: ToastController) {
     
     // this.navCtrl.setRoot(ListPage)
      this.FormLogin=this.formBuilder.group({
        nip:['', Validators.required],
        
        password:['', Validators.required]
      });
  }
 

  login(){
    
    localStorage.clear();
    this.authService.postData(this.FormLogin.value,'login').then((result) => {
     this.responseData = result;
    
     if(this.responseData.msg !== 'error'){
      localStorage.setItem('userData', JSON.stringify(this.responseData));
   
   
    
     // console.log(this.responseData.userData.nama)
      let data_user=JSON.parse(localStorage.getItem('userData'))
     
      const toast = this.toastCtrl.create({
       message: 'Selamat datang '+data_user.nama,
       duration: 3000
     });
     toast.present();
      this.navCtrl.setRoot(ListPage, {}, {animate: true, duration:800, direction: 'backward'});
     }
     else{ 
        const toast = this.toastCtrl.create({
          message: this.responseData.text,
          showCloseButton:true,
          closeButtonText:"Tutup",
          duration:5000
        });
        toast.present();
    }
   }, (err) => {
     console.log(err);
   });
 }
 
}