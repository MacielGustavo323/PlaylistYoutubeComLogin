import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { ResetpasswordPage } from '../resetpassword/resetpassword';
import { NgForm } from '@angular/forms';
import 'rxjs/Operator';
import {AuthService} from "../../providers/auth/auth-service";
import { User } from '../../providers/auth/user';
import { HomePage } from '../home/home';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

 
  user: User = new User();
  
  @ViewChild('form') form: NgForm;

  constructor(public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public navParams: NavParams, 
    public authService: AuthService,
    private loadingCtrl: LoadingController) {
  
  }

  createAccount(){
    this.navCtrl.push(RegisterPage);
  }
 resetPass(){
   this.navCtrl.push(ResetpasswordPage);
 }

 signIn(){
   if(this.form.form.valid){
     this.authService.signIn(this.user)
     .then(() => {
      this.presentLoadingDefault();
        this.navCtrl.setRoot(HomePage);
     })
     .catch((error: any) =>{
       let toast = this.toastCtrl.create({ duration:3000, position:'bottom' });
       if(error.code == 'auth/invalid-email'){
         toast.setMessage('Email Invalido');
         toast.present();
       }else if(error.code == 'auth/user-disable'){
        toast.setMessage('Usuario está desativado');
        toast.present();
      }else if(error.code == 'auth/user-not-found'){
        toast.setMessage('Usuario não Encontrado');
        toast.present();
      }else if(error.code == 'auth/wrong-password'){
        toast.setMessage('Senha incorreta');
        toast.present();
      }
     });
   }
 }

 presentLoadingDefault() {
  let loading = this.loadingCtrl.create({
    content: 'Aguarde um instante...'
  });

  loading.present();

  setTimeout(() => {
    loading.dismiss();
  }, 2000);
}
}
