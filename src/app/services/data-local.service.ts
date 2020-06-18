import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  favoriteNews: Article[] = [];

  constructor( private storage: Storage,
               public toastCtrl: ToastController) {

    this.loadFavorite();
   }

   async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      cssClass : 'toast',
      duration: 2000
    });
    toast.present();
  }

   /* Save new in storage in datalocal*/
  saveNew( notice: Article ){

    const existe = this.favoriteNews.find( noti => noti.title === notice.title);

    if (!existe){
      this.favoriteNews.unshift( notice );
        // set a key/value
      this.storage.set('Favorite', this.favoriteNews);
    }

    this.presentToast('Add in Favorites');

  }

  /* Delete new of Favorite News*/
  deleteNew( notice: Article ){

    this.favoriteNews = this.favoriteNews.filter( noti => noti.title !== notice.title);
    this.presentToast('Delete in  Favorites');

  }

  /* Load News in datalocal storage */
  async loadFavorite(){

    const favorites = await this.storage.get('Favorite');

    if (favorites){
      this.favoriteNews  = favorites;
      this.storage.set('Favorite', this.favoriteNews);
    }
  }

}
