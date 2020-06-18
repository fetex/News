import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  favoriteNews: Article[] = [];

  constructor( private storage: Storage) {

    this.loadFavorite();
   }

   /* Save new in storage in datalocal*/
  saveNew( notice: Article ){

    const existe = this.favoriteNews.find( noti => noti.title === notice.title);

    if (!existe){
      this.favoriteNews.unshift( notice );
        // set a key/value
      this.storage.set('Favorite', this.favoriteNews);
      console.log('Save new');
    }

  }

  /* Delete new of Favorite News*/
  deleteNew( notice: Article ){

    this.favoriteNews = this.favoriteNews.filter( noti => noti.title !== notice.title);
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
