import {Injectable} from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() {
  }

  /**
   * this method is used to add intermediate operations to the htp request before it is sent
   **/
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('request on the way');
    const modifiedRequest = req.clone({
      headers: req.headers.append('auth', 'abc123')
    });
    return next.handle(req).pipe(tap(event => {
      console.log(event);
      if (event.type === HttpEventType.Response) {
        console.log('Response arrived, body data : ');
        console.log(event.body);
      }
    }));
  }
}
