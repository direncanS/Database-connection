import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {domain_name} from "./path-controller"



export class DomainInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const changeRequest = req.clone({

      url: domain_name + req.url
    });

    return next.handle(changeRequest);
  }

}
