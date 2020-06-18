import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  news: Article[] = [];

  constructor( private newService: NewsService) {}

  ngOnInit() {
    this.loadNews();
  }

  loadData(event){
    console.log(event);
    this.loadNews(event);
  }

  loadNews( event?){
    this.newService.getTopHeadlines().subscribe( resp => {
      console.log( 'new', resp);

      if (resp.articles.length > 0){
        this.news.push(...resp.articles);
        // event.target.disabled = true;
        // event.target.complete();
        // return;
      }

      /*this.news = res.articles; Rewrite arrays of news*/

      if (event) {
        event.target.complete();
        event.target.disabled = (resp.articles.length === 0);

      }
    });
  }
}

