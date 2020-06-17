import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseTopHeadlines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor( private http: HttpClient) { }

  getTopHeadlines(){
    return this.http.get<ResponseTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=5ff30d4ec6aa463086f3cb32e22744fb`);

  }
}
