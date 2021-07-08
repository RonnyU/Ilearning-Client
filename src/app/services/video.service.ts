import { Injectable } from '@angular/core';
// tslint:disable-next-line: no-submodule-imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../services/global';
import { environment } from 'src/environments/environment';

@Injectable()
export class VideoService {
  private url: string;

  constructor(private _http: HttpClient) {
    this.url = environment.url;
  }

  prueba() {
    return 'METODO DE PRUEBA';
  }
  createVideo(video, token): Observable<any> {
    const params = JSON.stringify(video);
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    // hacer peticion ajax
    return this._http.post(this.url + 'video', params, {
      headers: apiHeaders,
    });
  }
  addVideoValues(data, token): Observable<any> {
    const apiHeaders = new HttpHeaders().set('Authorization', token);

    // hacer peticion ajax
    return this._http.post(this.url + 'video/addVideoValues', data, {
      headers: apiHeaders,
    });
  }
  addVideoMap(payload, token): Observable<any> {
    const apiHeaders = new HttpHeaders().set('Authorization', token);

    // hacer peticion ajax
    return this._http.post(this.url + '/video/map', payload, {
      headers: apiHeaders,
    });
  }

  getVideo(videoId): Observable<any> {
    const apiHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    return this._http.get(this.url + '' + videoId, {
      headers: apiHeaders,
    });
  }

  createSupportMaterial(supportMaterial, token, videoId): Observable<any> {
    const params = JSON.stringify(supportMaterial);
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    // hacer peticion ajax
    return this._http.post(this.url + 'video/uploadSM/' + videoId, params, {
      headers: apiHeaders,
    });
  }

  deleteSupportMaterial(token, videoId, smId): Observable<any> {
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.delete(
      this.url + 'video/deleteSM/' + videoId + '/' + smId,
      {
        headers: apiHeaders,
      }
    );
  }
  deleteVideo(token, data, videoId, courseId): Observable<any> {
    const apiHeaders = new HttpHeaders().set('Authorization', token);

    return this._http.post(
      this.url + 'video/deleteVideo/' + videoId + '/' + courseId,
      data,
      {
        headers: apiHeaders,
      }
    );
  }
}
