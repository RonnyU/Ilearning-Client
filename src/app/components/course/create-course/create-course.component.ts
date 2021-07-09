import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { SubcategoryService } from '../../../services/subcategory.service';
import { FrontUtilities } from '../../../../assets/front-utilities/front-utilities';
import { NOTYF } from '../../../../assets/ts/notyf.token';
import { Notyf } from 'notyf';
import { CourseService } from '../../../services/course.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as customBuild from '../../../../assets/EditorCustom/ckeditor';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
  providers: [UserService],
})
export class CreateCourseComponent implements OnInit {
  public options: Object = {
    charCounterCount: true,
    attribution: false,
    language: 'es',
    placeholderText: 'Escribe una descripcion para el curso',
    theme: 'dark',
  };
  public util;
  public Editor = customBuild;
  public files: File[] = [];
  public videoIntro: File[] = [];
  public token;
  public identity;
  public subs = Array<any>();
  public mssg: string;
  public event: any;
  public toUpdate = {
    title: '',
    courseDesc: '',
    coursePrice: '',
  };
  public _idFU = '';
  p: number = 1;

  constructor(
    public _categoryService: CategoryService,
    public _subcategoryService: SubcategoryService,
    public _courseService: CourseService,
    public _userService: UserService,
    @Inject(NOTYF) private notyf: Notyf,
    public _route: ActivatedRoute,
    public _router: Router,
    public _modalService: NgbModal
  ) {
    this.identity = this._userService.getIdentity();
    this.util = FrontUtilities;
    this.token = localStorage.getItem('token');
    const usuario = JSON.parse(localStorage.getItem('identity'));
    if (usuario.role == 'ROLE_STUDENT') {
      this._router.navigate(['/inicio']);
    }
  }

  ngOnInit(): void {
    this.listCategories();
    this.util.accordion();
    this.listCreatedCourse();
  }
  videoSelected(e) {
    //get the file name
    this.videoIntro = [];
    this.videoIntro.push(e[0]);

    $('#eliminar-video-promo').slideDown(300);
    var fileName = $('#validatedCustomFile').val();
    //replace the "Choose a file" label
    $('.custom-file-label').html(
      fileName.replace(
        'C:' + String.fromCharCode(92) + 'fakepath' + String.fromCharCode(92),
        ''
      )
    );
  }
  removeVideoFile() {
    $('#eliminar-video-promo').slideUp(300);
    this.videoIntro = [];
    $('.custom-file-label').html('Elegir un video');
  }
  onSelect(event) {
    this.event = event;
    if (this.files.length > 0) {
      this.onRemove(event);
      this.files.push(event.addedFiles[0]);
    } else {
      this.files.push(event.addedFiles[0]);
    }
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  onSubmit(data) {
    let course = data.form.value;
    course.subcategories = this.subs;
    course.activeCourse = false;
    if (
      course.title == '' ||
      course.courseDesc == '' ||
      course.coursePrice == '' ||
      course.title == null ||
      course.courseDesc == null ||
      course.coursePrice == null
    ) {
      this.notyf.open({
        message: 'Por favor completa todos los campos.',
        duration: 3500,
        type: 'warning',
      });
    } else if (this.subs.length < 1) {
      this.notyf.open({
        message: 'Por favor seleccione una subcategoría antes de continuar.',
        duration: 3500,
        type: 'warning',
      });
    } else if (this.files.length < 1) {
      this.notyf.open({
        message: 'Por favor selecciona una imagen de portada para este curso.',
        duration: 3500,
        type: 'warning',
      });
    } else {
      this._courseService.create(course, this.token).subscribe(
        (res) => {
          if (res[0].status) {
            this.listCreatedCourse();
            const formData = new FormData();
            formData.append('file', this.files[0], this.files[0].name);
            this._courseService
              .uploadCourseImage(
                res[0].course._id,
                formData,
                localStorage.getItem('token')
              )
              .subscribe(
                (res) => {},
                (err) => {
                  console.log(err);
                }
              );
            if (this.videoIntro.length > 0) {
              const formData = new FormData();
              formData.append(
                'file',
                this.videoIntro[0],
                this.videoIntro[0].name
              );
              this._courseService
                .uploadCoursevideoIntro(
                  res[0].course._id,
                  formData,
                  localStorage.getItem('token')
                )
                .subscribe(
                  (res) => {},
                  (err) => {
                    console.log(err);
                  }
                );
            }

            this.notyf.success(
              'Curso correctamente agregado. Se puede visualizar en la tabla ubicada abajo.'
            );
            data.reset();
            this.onRemove(this.event);
          } else {
            this.notyf.error('No se pudo agregar el curso.');
          }
        },
        (err) => {
          this.notyf.error('No se pudo agregar el curso.');
          console.log(err);
        }
      );
    }
  }
  listCategories() {
    this._categoryService.getCategories().subscribe((res) => {
      if (res) {
        this._categoryService.categoryData = res.categories;
      } else {
      }
    });
  }
  listSubcategories() {
    const category = $('#category').val();
    this._subcategoryService
      .getSubcategoryBasedOnCategory(category)
      .subscribe((res) => {
        if (res.status) {
          this.subs = [];
          this._subcategoryService.subcategoryData = res.subcategories;
        } else {
          console.log('error');
        }
      });
  }
  listCreatedCourse(page = 1) {
    this._courseService.getCoursesByCurrentUser(this.token).subscribe(
      (res) => {
        if (res.status) {
          this._courseService.createdCourses = res.courses;
        } else {
        }
      },
      (err) => {
        console.log(err);
      }
    );
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
              this.listCreatedCourse();
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
  handleSubs(e, id) {
    if (e.target.checked) {
      this.subs.push(id);
    } else {
      this.subs = this.subs.filter((m) => m != id);
    }
  }
  unPublishCourse(e, id) {
    if (e.target.checked) {
      this._courseService.activeCourse(this.token, id).subscribe(
        (res) => {
          if (res.status) {
            this.notyf.success(
              'El curso ha sido activado y es visible para todos'
            );
            this.listCreatedCourse();
          } else {
            this.notyf.error('No se pudo publicar el curso.');
            this.listCreatedCourse();
          }
        },
        (err) => {
          this.notyf.error('No se pudo publicar el curso.');
          console.log(err);
          this.listCreatedCourse();
        }
      );
    } else {
      this._courseService.deactiveCourse(this.token, id).subscribe(
        (res) => {
          if (res.status) {
            this.notyf.open({
              message: 'Se ha ocultado el curso al publico',
              type: 'warning',
              duration: 2500,
            });
            this.listCreatedCourse();
          } else {
            this.notyf.error('No se pudo actualizar el estado del curso.');
            this.listCreatedCourse();
          }
        },
        (err) => {
          this.notyf.error('No se pudo actualizar el estado del curso.');
          console.log(err);
          this.listCreatedCourse();
        }
      );
    }
  }
  deleteCourse(content, id) {
    const modal = this._modalService.open(content, {
      size: 'md',
    });
    modal.result.then((confirm) => {
      if (confirm) {
        this._courseService.deleteCourse(this.token, id).subscribe(
          (res) => {
            if (res) {
              this.notyf.success('Curso eliminado');
              this.listCreatedCourse();
            } else {
              this.notyf.error('No se pudo eliminar el curso.');
            }
          },
          (err) => {
            this.notyf.error('No se pudo eliminar el curso.');
            console.log(err);
          }
        );
      }
    });
  }
}
