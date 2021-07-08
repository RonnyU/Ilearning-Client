import { Injectable } from '@angular/core';
// tslint:disable-next-line: no-submodule-imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../services/global';
import { Category } from '../models/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url: string;
  categoryData: Category[];
  constructor(private _http: HttpClient) {
    this.url = environment.url;
  }

  prueba() {
    return 'METODO DE PRUEBA';
  }
  create(category, token): Observable<any> {
    const params = JSON.stringify(category);
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    // hacer peticion ajax
    return this._http.post(this.url + 'category', params, {
      headers: apiHeaders,
    });
  }

  getCategory(categoryId): Observable<any> {
    const apiHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    return this._http.get(this.url + 'category/' + categoryId, {
      headers: apiHeaders,
    });
  }

  getCategories(): Observable<any> {
    const apiHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    return this._http.get<Category[]>(this.url + 'categories', {
      headers: apiHeaders,
    });
  }

  update(token, comment, categoryId): Observable<any> {
    const params = JSON.stringify(comment);
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(this.url + 'category/' + categoryId, params, {
      headers: apiHeaders,
    });
  }

  delete(token, categoryId) {
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.delete(this.url + 'category/' + categoryId, {
      headers: apiHeaders,
    });
  }
}
