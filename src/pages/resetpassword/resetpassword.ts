import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../providers/auth/auth-service';
import { User } from '../../providers/auth/user';


@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {
  user: User = new User();
  userEmail: string = '';

 @ViewChild('form')form: NgForm; 
  
 constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
  public authService: AuthService, private loadingCtrl: LoadingController) {
  }
resetPass(){
  if(this.form.form){
    let toast = this.toastCtrl.create({duration:3000, position: 'bottom'})
    this.authService.resetPass(this.userEmail)
    .then(() =>{
      this.presentLoadingDefault();
      toast.setMessage('Solicitação Foi enviada para seu email');
      toast.present();

      this.navCtrl.pop();
    })
    .catch((error: any) => {
      if(error.code == 'auth/invalid-email'){
        toast.setMessage('Email invalido');
      }
      else if(error.code == 'auth/user-not-found'){
        toast.setMessage('Usuário não encontrado');
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
