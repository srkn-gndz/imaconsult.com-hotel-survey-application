import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError, lastValueFrom, firstValueFrom } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import { IUser } from '../models/user';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UserService {
    user: IUser;
    user_me: IUser;
    survey_answers: any;
    constructor
    (
        public http: HttpClient,
        public _snackBar: MatSnackBar
    ) 
    {
        this.user = <IUser>{};
        this.user_me = <IUser>{};
        this.survey_answers = {};
    }

    private handleError = (error: HttpErrorResponse) => {
        if (error.status === 0) {
          console.error('An error occurred:', error.error);
        } else {
          this._snackBar.open('', ' code:' + error.error.code + ' message:' + error.error.message, {
            duration: 5000,
          });
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
      }

    login(data: any):Observable<any> {
        return this.http.post(`https://www.icibot.net/p_login`, data, { observe: 'response' }).pipe(
            catchError(this.handleError)
        );
    }

    me():Observable<any> {
        return this.http.get(`https://www.icibot.net/v2/api/app_me`, { observe: 'response' }).pipe(
            catchError(this.handleError)
        );
    }

    survey_24():Observable<any> {
        return this.http.get(`https://www.icibot.net/v2/api/main_survey/24`, { observe: 'response' }).pipe(
            catchError(this.handleError)
        );
    }

    get_survey_24_result(data: any):Observable<any> {
        return this.http.post(`https://www.icibot.net/v2/api/survey_answer`, data, { observe: 'response' }).pipe(
            catchError(this.handleError)
        );
    }
}
