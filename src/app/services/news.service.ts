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

  constructor( private http: HttpClient) { }

  private runQuery( query: string){
    query = apiURL + query;

    return this.http.get(query, {headers});
  }

  getTopHeadlines(){
    return this.runQuery(`/top-headlines?country=us`);
  }

  getTopHeadlinesCategory( category: string){
    return this.runQuery(`/top-headlines?country=us&category=${category}`);
  }
}
