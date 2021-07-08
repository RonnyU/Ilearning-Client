import { Injectable } from '@angular/core';
// tslint:disable-next-line: no-submodule-imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../services/global';
import { environment } from 'src/environments/environment';

@Injectable()
export class ChapterService {
  private url: string;

  constructor(private _http: HttpClient) {
    this.url = environment.url;
  }

  prueba() {
    return 'METODO DE PRUEBA';
  }
  createChapter(chapter, token, courseId): Observable<any> {
    const apiHeaders = new HttpHeaders().set('Authorization', token);

    // hacer peticion ajax
    return this._http.post(
      this.url + 'course/addChapter/' + courseId,
      chapter,
      {
        headers: apiHeaders,
      }
    );
  }

  // TODO metodo aun no disponible en el API
  getChapters(): Observable<any> {
    const apiHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    return this._http.get(this.url + '', { headers: apiHeaders });
  }

  // TODO metodo aun no disponible en el API
  getChapter(chapterId): Observable<any> {
    const apiHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    return this._http.get(this.url + '' + chapterId, {
      headers: apiHeaders,
    });
  }

  updateChapter(token, chapter, courseId, chapterId): Observable<any> {
    const params = JSON.stringify(chapter);
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(
      this.url + 'course/updateChapter/' + courseId + '/' + chapterId,
      params,
      {
        headers: apiHeaders,
      }
    );
  }

  deleteChapter(token, courseId, chapterId): Observable<any> {
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.delete(
      this.url + 'course/deleteChapter/' + courseId + '/' + chapterId,
      {
        headers: apiHeaders,
      }
    );
  }

  // The following methos are related with Lesson class

  createLesson(lesson, token, courseId, chapterId): Observable<any> {
    const apiHeaders = new HttpHeaders().set('Authorization', token);

    // hacer peticion ajax
    return this._http.post(
      this.url + 'course/addLesson/' + courseId + '/' + chapterId,
      lesson,
      {
        headers: apiHeaders,
      }
    );
  }

  // TODO metodo aun no disponible en el API
  getLessonsByChapterId(chapterId): Observable<any> {
    const apiHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    return this._http.get(this.url + '' + chapterId, {
      headers: apiHeaders,
    });
  }

  updateLesson(token, lesson, courseId, chapterId, lessonId): Observable<any> {
    const params = JSON.stringify(lesson);
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(
      this.url +
        'course/updateLesson/' +
        courseId +
        '/' +
        chapterId +
        '/' +
        lessonId,
      params,
      {
        headers: apiHeaders,
      }
    );
  }

  deleteLesson(token, courseId, chapterId, lessonId) {
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.delete(
      this.url +
        'course/deleteLesson/' +
        courseId +
        '/' +
        chapterId +
        '/' +
        lessonId,
      {
        headers: apiHeaders,
      }
    );
  }
}
