import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

import { Storage } from '@ionic/storage';
import get from "lodash/get";
import { from, Observable } from 'rxjs';
import { IonhelperService } from '../helper/ionhelper.service';
import { ConnectionStatus, NetworkService } from '../helper/network.service';
import { OfflinemanegerService } from '../helper/offlinemaneger.service';
@Injectable({
  providedIn: 'root'
})
export class WbserviceService {

  constructor(
    private http: HttpClient ,
    private network: NetworkService ,
    private ion: IonhelperService,
    private networkService: NetworkService,
    private storage: Storage,
    private offlineManager: OfflinemanegerService
    ) {}
  private baseURL = `https://vfmglobal.org/wp-json/wc/v3/products?consumer_key=ck_5a0e53e5829254ca693ce69cc6d91791bbbb7f58&consumer_secret=cs_c0a8ed989344985b61ae022ae35e5e0bca7e94b5`;
  // totalpost = null;  pages: any;
  url = 'https://vfmglobal.org'
  consumerKey = 'ck_5a0e53e5829254ca693ce69cc6d91791bbbb7f58'
  consumerSecret  = 'cs_c0a8ed989344985b61ae022ae35e5e0bca7e94b5'

  getProducts() {
    return `https://vfmglobal.org/wp-json/wc/v3/products?consumer_key=ck_5a0e53e58
    29254ca693ce69cc6d91791bbbb7f58&consumer_secret=cs_c0a8ed989344985b61ae022ae35e5e0bca7e94b5`;
  }
 
  

  private getLocalData(key) {
    return this.storage.get(`${this.baseURL}-${key}`);
  }

  searchNews(keyword){
    return this.http
    .get(`${this.baseURL}/wp-js?=search[${keyword}]`)
    .pipe(
      map((posts: Array<any>) => posts.map(this.setEmbeddedFeaturedImage))
    );
  }

  fetchPosts(forceRefresh: boolean = false): Observable<any> {
  
    return this.http.get(`https://vfmglobal.org/wp-json/wc/v3/products?consumer_key=ck_5a0e53e5829254ca693ce69cc6d91791bbbb7f58&consumer_secret=cs_c0a8ed989344985b61ae022ae35e5e0bca7e94b5`)
      .pipe(
        map((posts: Array<any>) => posts.map(this.setEmbeddedFeaturedImage))
      );
 }

  fetchPost(post_id: string) {
    return this.http
      .get(`${this.baseURL}/wp-json/wp/v2/posts/${post_id}?_embed`)
      .pipe(map((post: any) => this.setEmbeddedFeaturedImage(post)));
  }

  /**
   * Makes the featured image parameter easily accessible in a template
   */
  private setEmbeddedFeaturedImage(p) {
    return Object.assign({}, p, {
      featured_image: get(p, "_embedded['wp:featuredmedia'][0].source_url")
    });
  }

  fetchPostCategories() {
    return this.http.get(`${this.baseURL}/wp-json/wp/v2/categories`);
  }



  getProduct(pid) {
     return this.http
        .get(
          `${this.url}/wp-json/wc/v3/products/${pid}?consumer_key=${
            this.consumerKey
          }&consumer_secret=${this.consumerSecret}`
        )
        
      .pipe(map((post: any) => this.setEmbeddedFeaturedImage(post)));
    
  }
}
