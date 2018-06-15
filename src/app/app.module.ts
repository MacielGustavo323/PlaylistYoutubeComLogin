import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PlaylistPage } from '../pages/playlist/playlist';
import { RegisterPage} from "../pages/register/register";
import { YoutubeService } from '../providers/YoutubeService';
import{LoginPage}from '../pages/login/login';
import{AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from "angularfire2/auth";
import {ResetpasswordPage} from "../pages/resetpassword/resetpassword";
import {AuthService} from "../providers/auth/auth-service";

const firebaseconfig = {
  apiKey: "AIzaSyB1HCKlsHfwCVi52-OEIsNZ2y67YmskaaE",
  authDomain: "my-project-1527266985734.firebaseapp.com",
  databaseURL: "https://my-project-1527266985734.firebaseio.com",
  projectId: "my-project-1527266985734",
  storageBucket: "my-project-1527266985734.appspot.com",
  messagingSenderId: "625548803479"
};



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlaylistPage,
    LoginPage,
    RegisterPage,
    ResetpasswordPage,
   
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireModule,
    AngularFireModule.initializeApp(firebaseconfig)

    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlaylistPage,
    LoginPage,
    RegisterPage,
    ResetpasswordPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    YoutubeService,
    YoutubeVideoPlayer,
    { provide: ErrorHandler, useClass: IonicErrorHandler }, AuthService
  ]
})
export class AppModule { }
