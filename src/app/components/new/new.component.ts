import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

import { ActionSheetController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

  @Input() new: Article;
  @Input() index: number;

  constructor( private iab: InAppBrowser,
               private actionSheetCtlr: ActionSheetController,
               private socialSharing: SocialSharing,
               private dataLocalService: DataLocalService ) { }

  ngOnInit() {}

  openNew(){
    const browser = this.iab.create(this.new.url, '_system');
  }

  async  menuOptions(){
    const actionSheet = await this.actionSheetCtlr.create({
      cssClass: 'my-custom-class',
      buttons: [
        {
        text: 'Share',
        icon: 'share-social-outline',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          // this.socialSharing.share(
          //   this.new.title,
          //   this.new.source.name,
          //   '',
          //   this.new.url
          // );   /* share news from phone*/
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
          this.dataLocalService.saveNew(this.new );
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
