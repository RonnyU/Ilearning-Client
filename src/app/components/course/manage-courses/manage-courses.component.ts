import { Course } from './../../../models/course';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { UserService } from '../../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NOTYF } from '../../../../assets/ts/notyf.token';
import { Notyf } from 'notyf';
import * as customBuild from '../../../../assets/EditorCustom/ckeditor';

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css'],
  providers: [CourseService, UserService],
})
export class ManageCoursesComponent implements OnInit {
  public courses: Array<Course>;
  public token;
  public Editor = customBuild;
  public identity;
  public url;
  public totalPages;
  public numberPages;
  public page;
  public nextPage;
  public prevPage;
  public _idFU = '';
  public toUpdate = {
    title: '',
    courseDesc: '',
    coursePrice: '',
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    @Inject(NOTYF) private notyf: Notyf,
    private _courseService: CourseService,
    private _userService: UserService,
    public _modalService: NgbModal
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      let page = +params.page;

      if (!page || page == null || page === undefined) {
        page = 1;
        this.prevPage = 1;
        this.nextPage = 2;
      }
      this.getCourses(page);
    });
  }

  getCourses(page = 1) {
    this._courseService
      .getCoursesByUserPaginated(this.identity._id, page)
      .subscribe(
        (response) => {
          if (response.courses) {
            this.courses = response.courses;
            // navegacion de paginacion

            this.totalPages = response.totalPages;

            const arrayPages = [];

            for (let i = 1; i <= this.totalPages; i++) {
              arrayPages.push(i);
            }
            this.numberPages = arrayPages;

            if (page >= 2) {
              this.prevPage = page - 1;
            } else {
              this.prevPage = 1;
            }

            if (page < this.totalPages) {
              this.nextPage = page + 1;
            } else {
              this.nextPage = this.totalPages;
            }
          } else {
            this._router.navigate(['/inicio']);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteCourse(courseId) {
    this._courseService.deleteCourse(this.token, courseId).subscribe(
      (res) => {
        if (res['status'] == true) {
          this.getCourses();
        } else {
          console.log('algo salio mal a la hora de borrar el curso');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  switchCourseStatus(option, courseId) {
    switch (option) {
      case 0:
        this._courseService.disableCourse(this.token, courseId).subscribe(
          (response) => {
            if (response['status'] == false) {
              console.log('problemas al intentar desactivar el curso');
            }
            this.notyf.open({
              message: 'Se ha ocultado el curso al publico',
              type: 'warning',
              duration: 2500,
            });
            this.getCourses();
          },
          (error) => {
            console.log(error);
          }
        );
        break;
      case 1:
        this._courseService.enableCourse(this.token, courseId).subscribe(
          (response) => {
            if (response['status'] == false) {
              console.log('problemas al intentar activar el curso');
            }
            this.notyf.success(
              'El curso ha sido activado y es visible para todos'
            );
            this.getCourses();
          },
          (error) => {
            console.log(error);
          }
        );
        break;
      default:
        console.log('switchCourseStatus DEFAULT');
        break;
    }
  }

  editCourse(id, content) {
    this._courseService.getCourse(id).subscribe(
      (res) => {
        if (res.status) {
          this._idFU = res.course._id;
          this.toUpdate.title = res.course.title;

          this.toUpdate.coursePrice = res.course.coursePrice;

          const modal = this._modalService.open(content, {
            size: 'lg',
          });

          setTimeout(() => {
            this.toUpdate.courseDesc = res.course.courseDesc;
          }, 10);
        } else {
          this.notyf.error(
            'No se encontro el curso. Trata recargando la pagina actual.'
          );
        }
      },
      (err) => {}
    );
  }
  commitEditCourse(form) {
    if (
      this.toUpdate.title == undefined ||
      this.toUpdate.title == '' ||
      this.toUpdate.coursePrice == undefined ||
      this.toUpdate.coursePrice == '' ||
      this.toUpdate.courseDesc == undefined ||
      this.toUpdate.courseDesc == ''
    ) {
      this.notyf.open({
        type: 'warning',
        message: 'Todos los campos son necesarios',
      });
    } else {
      this._courseService
        .update(this.token, this.toUpdate, this._idFU)
        .subscribe(
          (res) => {
            if (res.status) {
              this.notyf.success('El curso se actualizó correctamente.');
              this.getCourses();
              this._modalService.dismissAll();
            } else {
              this.notyf.error('Error al actualizar el curso.');
            }
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
}
