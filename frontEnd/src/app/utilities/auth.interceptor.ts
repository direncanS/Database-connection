import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Injectable} from "@angular/core";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

     const initial_token= localStorage.getItem("accessToken")||""
     let cloned_request;
    if(initial_token.length >0)
    {

      cloned_request = req.clone({ setHeaders: { Authorization: `${initial_token}`  } });

      return next.handle(cloned_request);
    }
    cloned_request= req.clone({})

    return next.handle(cloned_request)

  }

}
