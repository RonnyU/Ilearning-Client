import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { global } from '../services/global';

@Injectable()
export class FileService {
  private url: string;
  constructor(private _http: HttpClient) {
    this.url = environment.url;
  }

  downloadFile(file: String) {
    var body = { filename: file };

    return this._http.post(this.url + '/comment/download', body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }
}
