import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'api/users';

  constructor(
    private httpClient: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.usersUrl)
      .pipe(
        catchError(this.handleError('getUsers', []))
      )
  }

  private handleError<T> (operation = 'operation', result? : T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  deleteUser(user: User | number): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    const id = typeof user === 'number' ? user: user.id;
    const url = `${this.usersUrl}/${id}`;

    return this.httpClient.delete<User>(url, httpOptions)
      .pipe(
        tap(_ => {
          
        }),
        catchError(this.handleError<User>(`deleteUser`))
      );
  }

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.httpClient.get<User>(url)
      .pipe(
        catchError(this.handleError<User>(`getUser firstName=${id}`))
      );
  }

  addUser(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.httpClient.post<User>(this.usersUrl, user, httpOptions)
      .pipe(
        tap((user: User) => {
          
        }),
        catchError(this.handleError<User>('addUser'))
      );
  }
}
