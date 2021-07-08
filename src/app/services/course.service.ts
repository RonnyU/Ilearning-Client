import { Injectable } from '@angular/core';
// tslint:disable-next-line: no-submodule-imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../services/global';
import { Course } from '../models/course';
import { namespace } from '../models/courseForEdit';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private url: string;
  //courseData: Course[];
  //courseDetailData: Course[];
  searchCourseData: Course[];
  createdCourses: Course[];
  courseForEdit: namespace.Chapter[];

  constructor(private _http: HttpClient) {
    this.url = environment.url;
  }

  prueba() {
    return 'METODO DE PRUEBA';
  }
  create(course, token): Observable<any> {
    const apiHeaders = new HttpHeaders().set('Authorization', token);

    // hacer peticion ajax
    return this._http.post(this.url + 'course', course, {
      headers: apiHeaders,
    });
  }
  uploadCourseImage(course, image, token): Observable<any> {
    console.log(image);

    const apiHeaders = new HttpHeaders().set('Authorization', token);
    // hacer peticion ajax
    return this._http.post(this.url + 'course/upload-image/' + course, image, {
      headers: apiHeaders,
    });
  }
  uploadCoursevideoIntro(course, video, token): Observable<any> {
    console.log(video);

    const apiHeaders = new HttpHeaders().set('Authorization', token);
    // hacer peticion ajax
    return this._http.post(this.url + 'course/upload-video/' + course, video, {
      headers: apiHeaders,
    });
  }

  getCourses(page = 1): Observable<any> {
    const apiHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    return this._http.get(this.url + 'courses/' + page, {
      headers: apiHeaders,
    });
  }

  getCourse(courseId): Observable<any> {
    const apiHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    return this._http.get(this.url + 'course/' + courseId, {
      headers: apiHeaders,
    });
  }

  getCreatedCourses(token): Observable<any> {
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url + 'courses/coursesBasedOnUser', {
      headers: apiHeaders,
    });
  }
  getPopulatedCourse(id, token): Observable<any> {
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get<namespace.Chapter[]>(
      this.url + 'course/edit/uniqueCourse/' + id,
      {
        headers: apiHeaders,
      }
    );
  }

  getCoursesByUser(userId): Observable<any> {
    const apiHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    return this._http.get(this.url + 'course/mycourses/' + userId, {
      headers: apiHeaders,
    });
  }
  getCoursesByCurrentUser(token): Observable<any> {
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url + 'course/courseByCurrentUser', {
      headers: apiHeaders,
    });
  }

  getCoursesByUserPaginated(userId, page = 1): Observable<any> {
    const apiHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    return this._http.get(
      this.url + 'course/mycourses-p/' + userId + '/' + page,
      {
        headers: apiHeaders,
      }
    );
  }

  searchCourses(searchValue: string): Observable<any> {
    const apiHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );

    return this._http.get<Course[]>(
      this.url + 'course/searchCourses/' + searchValue,
      {
        headers: apiHeaders,
      }
    );
  }

  update(token, course, courseId): Observable<any> {
    const apiHeaders = new HttpHeaders().set('Authorization', token);

    return this._http.put(this.url + 'course/' + courseId, course, {
      headers: apiHeaders,
    });
  }
  activeCourse(token, courseId): Observable<any> {
    const apiHeaders = new HttpHeaders().set('Authorization', token);

    return this._http.put(
      this.url + 'course/enableCourse/' + courseId,
      {},
      {
        headers: apiHeaders,
      }
    );
  }
  deactiveCourse(token, courseId): Observable<any> {
    const apiHeaders = new HttpHeaders().set('Authorization', token);

    return this._http.put(
      this.url + 'course/disableCourse/' + courseId,
      {},
      {
        headers: apiHeaders,
      }
    );
  }
  deleteCourse(token, courseId): Observable<any> {
    const apiHeaders = new HttpHeaders().set('Authorization', token);

    return this._http.delete(this.url + 'course/deleteCourse/' + courseId, {
      headers: apiHeaders,
    });
  }
  enableCourse(token, courseId) {
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(
      this.url + 'course/enableCourse/' + courseId,
      {},
      {
        headers: apiHeaders,
      }
    );
  }

  disableCourse(token, courseId) {
    const apiHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(
      this.url + 'course/disableCourse/' + courseId,
      {},
      {
        headers: apiHeaders,
      }
    );
  }
  reorderLessons(token, courseId, data): Observable<any> {
    const apiHeaders = new HttpHeaders().set('Authorization', token);

    return this._http.put(
      this.url + 'course/reorderLessons/' + courseId,
      data,
      {
        headers: apiHeaders,
      }
    );
  }
  reorderChapters(token, courseId, data): Observable<any> {
    const apiHeaders = new HttpHeaders().set('Authorization', token);

    return this._http.put(
      this.url + 'course/reorderChapters/' + courseId,
      data,
      {
        headers: apiHeaders,
      }
    );
  }
  updateChapter(token, courseId, chapterId, data): Observable<any> {
    const apiHeaders = new HttpHeaders().set('Authorization', token);

    return this._http.put(
      this.url + 'course/updateChapter/' + courseId + '/' + chapterId,
      data,
      {
        headers: apiHeaders,
      }
    );
  }
  updateLesson(token, courseId, chapterId, lessonId, data): Observable<any> {
    const apiHeaders = new HttpHeaders().set('Authorization', token);

    return this._http.put(
      this.url +
        'course/updateLesson/' +
        courseId +
        '/' +
        chapterId +
        '/' +
        lessonId,
      data,
      {
        headers: apiHeaders,
      }
    );
  }
}
