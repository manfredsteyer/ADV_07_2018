import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OAuthStorage } from 'angular-oauth2-oidc';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private oauthStorage: OAuthStorage
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith('http://www.angular.at/api')) {
            const headers = req.headers.set('Authorization', 'BEARER ' + this.oauthStorage.getItem('access_token') );
            req = req.clone( { headers });
        }
        return next.handle(req).pipe(
            catchError(err => this.handleError(err))
        )
    }

    handleError(err: HttpErrorResponse): Observable<HttpEvent<any>> {
        if (err.status == 401 || err.status == 403) {
            this.router.navigate(['/home', { needsLogin: true }]);
        }

        return throwError(err);
    }
}