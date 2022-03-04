import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user';

// BOOKMARK token.interceptor.ts
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  publicRoutes: string[];

  constructor(public userService: UserService) {
    this.publicRoutes = [
      'login'
    ];
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.publicRoutes.includes(request.urlWithParams)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.userService.user.token_val ? this.userService.user.token_val : ''}`
        }
      });
      return next.handle(request);
    } else {
      return next.handle(request);
    }
  }
}
