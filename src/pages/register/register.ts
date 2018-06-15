import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {Http} from '@angular/http';
import { User } from "../../providers/auth/user";
import { AuthService } from "../../providers/auth/auth-service";
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user: User = new User();
  @ViewChild('form') form: NgForm;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toastCtrl: ToastController,
              private authService: AuthService,
            private loadingCtrl: LoadingController){
  
  }
createAccount(){


if (this.form.form.valid){
  let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom'});
  
  this.authService.createUser(this.user)
  .then((user : any)=> {

    
    this.presentLoadingDefault();
      toast.setMessage('Usuário Criado com Sucesso.');

    
      toast.present();
      
      this.navCtrl.setRoot(HomePage);

  

    
  })
  .catch((error: any) => {
    if(error.code == 'auth/email-already-in-use'){
      toast.setMessage('Email já utilizado');
      toast.present();
    }else if(error.code == 'auth/invalid-email'){
      toast.setMessage('Email invalido');
      toast.present();
    }else if(error.code == 'auth/operation-not-allowed'){
      toast.setMessage('Não habilitado');
      toast.present();
    }else if(error.code == 'auth/weak-password'){
      toast.setMessage('Senha Fraca');
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
  }, 5000);
}

}
