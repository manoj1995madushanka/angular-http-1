import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Post} from './post.model';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  error = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title, content};
    this.http
      .post<{ name: string }>(
        'https://angular-backend-81e97-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe(
        responseData => {
          console.log(responseData);
        },
        error => {
          this.error.next(error.message);
        }
      );
  }

  deletePosts() {
    return this.http.delete(
      'https://ng-complete-guide-c56d3.firebaseio.com/posts.json',
      {
        observe: 'response'
      }
    );
  }

  fetchPosts() {

    let queryParams = new HttpParams();
    queryParams = queryParams.append('print', 'pretty');
    queryParams = queryParams.append('secondParam', 'second');

    return this.http
      .get<{ [key: string]: Post }>(
        'https://angular-backend-81e97-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({
            'Custom-Header': 'Hello'
          }),
          params: queryParams,
          observe: 'response',
          responseType: 'json'
        }
      )
      .pipe(
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({...responseData[key], id: key});
            }
          }
          return postsArray;
        })
      )
  }
}
