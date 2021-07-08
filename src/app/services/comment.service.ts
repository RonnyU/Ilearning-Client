import { Injectable } from '@angular/core';
// tslint:disable-next-line: no-submodule-imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../services/global';
import { environment } from 'src/environments/environment';

@Injectable()
export class CommentService {
  private url: string;

  constructor(private _http: HttpClient) {
    this.url = environment.url;
  }

  prueba() {
    return 'METODO DE PRUEBA';
  }
  create(comment, token, videoId): Observable<any> {
    comment.content = global.htmlEntities(comment.content);
    const params = JSON.stringify(comment);
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.post(this.url + 'comment/' + videoId, params, {
      headers: apiHeaders,
    });
  }

  //create comments inside comments
  createMoreComments(content, token, videoId, commentId): Observable<any> {
    content = global.htmlEntities(content);
    const params = JSON.stringify(content);
    const apiHeaders = new HttpHeaders().set('Authorization', token);

    let conte = {
      content: content,
    };

    return this._http.post(
      this.url + '/comment/' + videoId + '/' + commentId,
      conte,
      {
        headers: apiHeaders,
      }
    );
  }

  getComments(videoId, token): Observable<any> {
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url + 'comments/' + videoId, {
      headers: apiHeaders,
    });
  }
  getComment(videoId, commentId, token): Observable<any> {
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url + 'comment/' + videoId + '/' + commentId, {
      headers: apiHeaders,
    });
  }

  //get comments inside comments
  getCommentsInside(videoId, commentId, token): Observable<any> {
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(
      this.url + '/comment/comments/' + videoId + '/' + commentId,
      {
        headers: apiHeaders,
      }
    );
  }
  //get comment inside comments
  getCommentInside(videoId, commentId, cxc, token): Observable<any> {
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(
      this.url + '/comment/comment/' + videoId + '/' + commentId + '/' + cxc,
      {
        headers: apiHeaders,
      }
    );
  }

  update(token, comment, commentId): Observable<any> {
    const params = JSON.stringify(comment);
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.put(this.url + 'comment/' + commentId, params, {
      headers: apiHeaders,
    });
  }
  updateCXC(content, token, videoId, commentId, cxcId): Observable<any> {
    const apiHeaders = new HttpHeaders().set('Authorization', token);

    let conte = {
      content: content,
    };

    return this._http.put(
      this.url + 'comment/comment/' + videoId + '/' + commentId + '/' + cxcId,
      conte,
      {
        headers: apiHeaders,
      }
    );
  }

  delete(token, videoId, commentId) {
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.delete(
      this.url + 'comment/' + videoId + '/' + commentId,
      {
        headers: apiHeaders,
      }
    );
  }
  deleteCXC(token, videoId, commentId, cxc) {
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.delete(
      this.url + 'comment/comment/' + videoId + '/' + commentId + '/' + cxc,
      {
        headers: apiHeaders,
      }
    );
  }
}
