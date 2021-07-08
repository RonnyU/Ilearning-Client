import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  public url;
  constructor(private _http: HttpClient) {
    this.url = environment.url;
  }

  create(data): Observable<any> {
    return this._http.post(this.url + 'order/new', data);
  }
}
