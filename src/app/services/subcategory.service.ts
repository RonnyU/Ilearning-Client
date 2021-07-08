import { Injectable } from '@angular/core';
// tslint:disable-next-line: no-submodule-imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../services/global';
import { Subcategory } from '../models/Subcategory';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  private url: string;
  subcategoryData: Subcategory[];
  constructor(private _http: HttpClient) {
    this.url = environment.url;
  }

  getSubcategory(categoryId): Observable<any> {
    const apiHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    return this._http.get(this.url + 'subcategory/' + categoryId, {
      headers: apiHeaders,
    });
  }
  getSubcategoryBasedOnCategory(categoryId): Observable<any> {
    const apiHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    return this._http.get(
      this.url + 'subcategory/basedOnCategory/' + categoryId,
      {
        headers: apiHeaders,
      }
    );
  }

  getSubcategories(): Observable<any> {
    const apiHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    return this._http.get<Subcategory[]>(this.url + 'categories', {
      headers: apiHeaders,
    });
  }
}
