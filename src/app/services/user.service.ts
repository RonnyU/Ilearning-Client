import { Injectable } from '@angular/core';
// tslint:disable-next-line: no-submodule-imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../services/global';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
  private url: string;

  constructor(private _http: HttpClient) {
    this.url = environment.url;
  }

  prueba() {
    return 'METODO DE PRUEBA';
  }
  register(user): Observable<any> {
    const params = JSON.stringify(user);
    const apiHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    return this._http.post(this.url + 'register', params, {
      headers: apiHeaders,
    });
  }

  signup(user, gettoken = null): Observable<any> {
    if (gettoken != null) {
      user.gettoken = gettoken;
    }
    const params = JSON.stringify(user);
    const apiHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    return this._http.post(this.url + 'login', params, {
      headers: apiHeaders,
    });
  }

  getIdentity() {
    const identity = JSON.parse(localStorage.getItem('identity'));
    if (
      identity &&
      identity != null &&
      identity !== undefined &&
      identity !== 'undefined'
    ) {
      return identity;
    } else {
      return null;
    }
  }

  getToken() {
    const token = localStorage.getItem('token');
    if (
      token &&
      token != null &&
      token !== undefined &&
      token !== 'undefined'
    ) {
      return token;
    } else {
      return null;
    }
  }

  update(user): Observable<any> {
    // Limpiar campo content (editor texto enriquecido) htmlEntities > utf8
    user.userDesc = global.htmlEntities(user.userDesc);

    const params = JSON.stringify(user);

    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());
    console.log(apiHeaders);
    return this._http.put(this.url + 'user', params, {
      headers: apiHeaders,
    });
  }

  updatePassword(pass): Observable<any> {
    const params = JSON.stringify(pass);

    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());

    return this._http.put(this.url + 'user/change-password', params, {
      headers: apiHeaders,
    });
  }

  getMyCourses(): Observable<any> {
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());

    return this._http.get(this.url + 'user/mycourses', {
      headers: apiHeaders,
    });
  }

  disableAccount(pass): Observable<any> {
    const params = JSON.stringify(pass);

    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());

    console.log(apiHeaders);
    return this._http.put(this.url + 'user/disableAccount', pass, {
      headers: apiHeaders,
    });
  }

  enableAccount(id): Observable<any> {
    const apiHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    return this._http.put(
      this.url + 'user/enableAccount/' + id,
      {},
      {
        headers: apiHeaders,
      }
    );
  }

  getTotalOfCoursesBought(courseId): Observable<any> {
    const apiHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    return this._http.get(
      this.url + 'users/totalof-courses-bought/' + courseId,
      {
        headers: apiHeaders,
      }
    );
  }

  getUser(userId): Observable<any> {
    const apiHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    return this._http.get(this.url + 'user/' + userId, {
      headers: apiHeaders,
    });
  }

  getUsers(): Observable<any> {
    const apiHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    return this._http.get(this.url + 'users', {
      headers: apiHeaders,
    });
  }
}
