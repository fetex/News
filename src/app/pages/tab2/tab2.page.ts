import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {


  @ViewChild(IonSegment, {static: true})  segment: IonSegment;
  categories =  ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  notices: Article[] = [];

  constructor( private newService: NewsService){

  }

  ngOnInit(){
    this.segment.value = this.categories[0];  /* Value for defaul in the segment*/
    this.loadNews( this.categories[0]);
  }
  //
  changeCategory( event ){
    this.notices = [];
    this.loadNews( event.detail.value);  /* Update Value of segment */
  }
  /* Function for load news for category*/
  loadNews( category: string){
    this.newService.getTopHeadlinesCategory( category)
    .subscribe( resp => {
      console.log(resp);
      this.notices.push(...resp.articles);
    });
  }
}
