import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginService} from "../services/login.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private loginService:LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!request.url.includes("/auth/login")) {
      let req = request.clone({headers: request.headers.set("Authorization", "Bearer " + this.loginService.accessToken)});
      return next.handle(req);
    }else{
      return next.handle(request);
    }
  }
}
