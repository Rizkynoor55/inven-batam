import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http'; 

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { VerifikasiPage } from '../pages/verifikasi/verifikasi';


import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';


import { HasilScanPage } from '../pages/hasil-scan/hasil-scan';
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ListPage,
    VerifikasiPage,

    HasilScanPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgxQRCodeModule,
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ListPage,
    VerifikasiPage,
    HasilScanPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    
    AuthServiceProvider,
    
    
  ]
})
export class AppModule {}
