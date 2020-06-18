import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  favoriteNews: Article[] = [];

  constructor( private storage: Storage) { }

  saveNew( notice: Article ){

    const existe = this.favoriteNews.find( noti => noti.title === notice.title);

    if (!existe){
      this.favoriteNews.unshift( notice );
        // set a key/value
      this.storage.set('Favorite', this.favoriteNews);
      console.log('Save new');
    }

  }

  loadFavorite(){

  }
}
