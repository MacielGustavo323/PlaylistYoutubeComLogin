import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { YoutubeService } from '../../providers/YoutubeService';
import { PlaylistPage } from '../playlist/playlist';
 import{ LoginPage } from '../login/login';
import {AuthService} from '../../providers/auth/auth-service';
@Component({
  selector: 'page-home',
  templateUrl:'home.html'
})


export class HomePage {
  
  public channelId = 'UCbZjnrG3IdZBCoJbDUHh3Rw';
  public playlists: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public youtubeService: YoutubeService,
       public authService: AuthService) {
  }

  searchPlaylists() {
    this.playlists = this.youtubeService.getPlaylistsForChannel(this.channelId);

    this.playlists.subscribe(data => {
      console.log('playlists: ', data);
    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'Playlist não encontrada verifique o ID do canal',
        buttons: ['OK']
      });

      alert.present();
    })
  }

  openPlaylist(id) {
    this.navCtrl.push(PlaylistPage, {
      id: id
    });
  }

signOut()  {
  this.authService.signOut()
  .then( () => {
    this.navCtrl.setRoot(LoginPage);
  })
  .catch((error) => {
    console.error(error);
  });


}

}
