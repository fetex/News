import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';


const apikey = environment.apikey;
const apiURL = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-Key': apikey
});
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  headlinesPage = 0;

  constructor( private http: HttpClient) { }

  private runQuery<T>( query: string){
    query = apiURL + query;

    return this.http.get<T>(query, {headers});
  }

  getTopHeadlines(){
    this.headlinesPage++;
    return this.runQuery<ResponseTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
  }

  getTopHeadlinesCategory( category: string){
    return this.runQuery<ResponseTopHeadlines>(`/top-headlines?country=us&category=${category}`);
  }
}
