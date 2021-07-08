import { User } from './../../../models/user';
import { Component, OnInit, Inject, Type } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { NOTYF } from '../../../../assets/ts/notyf.token';
import { Notyf } from 'notyf';
import { CourseService } from 'src/app/services/course.service';
import { ChapterService } from 'src/app/services/chapter.service';
import { VideoService } from 'src/app/services/video.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FrontUtilities } from '../../../../assets/front-utilities/front-utilities';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { auto } from '@popperjs/core';
import { environment } from 'src/environments/environment';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css'],
  providers: [UserService, ChapterService, VideoService],
})
export class CourseEditComponent implements OnInit {
  public token;
  public toUpdate = {
    title: '',
    desc: '',
  };
  public _id;
  public chapterData = {
    chapterName: '',
    chapterDesc: '',
  };
  public lessonData = {
    lessonName: '',
    lessonDesc: '',
  };
  public resetVar;
  public afuConfig;
  public afuConfig2;
  public url;
  public title;
  public videoId;
  public user: User;
  public chapterId;
  public lessonId;
  public util;
  public autoZoom;
  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    public _courseService: CourseService,
    public _userService: UserService,
    public _chapterService: ChapterService,
    private route: ActivatedRoute,
    public _modalService: NgbModal,
    public _videoService: VideoService,
    private _router: Router
  ) {
    this.user = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.route.paramMap.subscribe((params) => {
      this._id = params.get('courseId');
      this.getCourse(this._id);
    });

    if (localStorage.getItem('zoomOut') == 'true') {
      this.autoZoom = true;
    } else {
      this.autoZoom = false;
    }

    this.util = FrontUtilities;

    this.url = environment.url;

    this.resetVar = true;
    this.afuConfig = {
      multiple: false,
      formatsAllowed: '.mov, .mp4, .avi, .wmv',
      maxSize: '1024',
      uploadAPI: {
        url: this.url + 'video/addVideo',
        headers: {
          Authorization: this.token,
        },
      },
      theme: 'DragNDrop',
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      replaceTexts: {
        selectFileBtn: 'Seleccionar video',
        resetBtn: 'Borrar',
        uploadBtn: 'Cargar video',
        dragNDropBox: 'Drag N Drop',
        afterUploadMsg_success: 'Video cargado correctamente.',
        afterUploadMsg_error: 'La carga del video falló',
      },
    };
  }

  ngOnInit(): void {
    this.util.tabs();
    this.util.accordion();
  }
  getCourse(_id: string) {
    this._courseService.getPopulatedCourse(_id, this.token).subscribe((res) => {
      if (res.status) {
        if (res.course[0].user != this.user._id) {
          this._router.navigate(['/inicio']);
        }

        this._courseService.courseForEdit = res.course[0].chapter.sort((a, b) =>
          a.position > b.position ? 1 : b.position > a.position ? -1 : 0
        );

        this.title = res.course[0].title;
      } else {
        console.log('error');
      }
    });
  }
  avatarUpload(data) {
    if (data.body.status) {
      const videoData = {
        videoDesc: data.body.fileName,
        videoPath: data.body.videoPath,
      };
      this._videoService
        .addVideoValues(videoData, this.token)
        .subscribe((response) => {
          if (response.status) {
            const payload = {
              chapterId: this.chapterId,
              lessonId: this.lessonId,
              courseId: this._id,
              videoId: response.video._id,
            };

            this._videoService
              .addVideoMap(payload, this.token)
              .subscribe((fres) => {
                if (fres.status) {
                  const modal = this._modalService;
                  modal.dismissAll();
                  this.notyf.success('Video agregado satisfactoriamente.');
                  this.getCourse(this._id);
                } else {
                  this.notyf.error('El video no pudo ser relacionado.');
                }
              });
          } else {
            this.notyf.error('No se ha podido crear el video.');
          }
        });
    } else {
      this.notyf.error(
        'No se pudo cargar el video. Por favor intentalo nuevamente'
      );
    }
  }
  loadPosition(i, j, content) {
    this.chapterId = i;
    this.lessonId = j;

    const modal = this._modalService.open(content, {
      size: 'md',
    });
  }
  addNewChapter(data) {
    if (this.chapterData.chapterName.trim() == '') {
      this.notyf.open({
        message: 'Por favor asignale un nombre al nuevo capítulo.',
        type: 'warning',
        duration: 4000,
      });
    } else {
      this._chapterService
        .createChapter(this.chapterData, this.token, this._id)
        .subscribe(
          (res) => {
            if (res.status) {
              this.notyf.success('El capítulo fue agregado satisfactoriamente');
              data.reset();
              this.getCourse(this._id);
              const scrollPosition = document.documentElement.scrollTop;
              document.scrollingElement.scrollTo();
              setTimeout(() => {
                window.scrollTo(0, scrollPosition);
              }, 500);
            } else {
              this.notyf.error(
                'Ha ocurrido un error al intentar agregar el capítulo.'
              );
            }
          },
          (err) => {
            this.notyf.error(
              'Ha ocurrido un error al intentar agregar el capítulo.'
            );
          }
        );
    }
  }
  deleteChapter(_id, content) {
    const modal = this._modalService.open(content, {
      size: 'md',
    });
    modal.result.then((confirm) => {
      if (confirm) {
        this._chapterService.deleteChapter(this.token, this._id, _id).subscribe(
          (res) => {
            if (res) {
              this.notyf.success(
                'El capítulo fue eliminado satisfactoriamente'
              );
              this.getCourse(this._id);
              const scrollPosition = document.documentElement.scrollTop;
              document.scrollingElement.scrollTo();
              setTimeout(() => {
                window.scrollTo(0, scrollPosition);
              }, 500);
            } else {
              this.notyf.success(
                'Este capítulo no pudo eliminarse. Por favor inténtelo nuevamente.'
              );
            }
          },
          (err) => {
            this.notyf.error(
              'Ocurrió un error desconocido. El capítulo nu fue eliminado'
            );
          }
        );
      }
    });
  }
  deleteLesson(_idChapter, _idLesson, content) {
    const modal = this._modalService.open(content, {
      size: 'md',
    });
    modal.result.then((confirm) => {
      if (confirm) {
        this._chapterService
          .deleteLesson(this.token, this._id, _idChapter, _idLesson)
          .subscribe(
            (res) => {
              if (res) {
                this.notyf.success(
                  'La lección fue eliminada satisfactoriamente'
                );
                this.getCourse(this._id);
                const scrollPosition = document.documentElement.scrollTop;
                document.scrollingElement.scrollTo();
                setTimeout(() => {
                  window.scrollTo(0, scrollPosition);
                }, 500);
              } else {
                this.notyf.success(
                  'Esta lección no pudo eliminarse. Por favor inténtelo nuevamente.'
                );
              }
            },
            (err) => {
              this.notyf.error(
                'Ocurrió un error desconocido. La lección nu fue eliminada'
              );
            }
          );
      }
    });
  }
  addNewLesson(id, data, position, i) {
    const lessonData = {
      lessonName: data.form.value.lessonName,
      lessonDesc: data.form.value.lessonDesc,
      position: position,
    };

    if (lessonData.lessonName.trim() == '') {
      this.notyf.open({
        message: 'Por favor asignale un nombre a esta lección.',
        type: 'warning',
        duration: 4000,
      });
    } else {
      this._chapterService
        .createLesson(lessonData, this.token, this._id, id)
        .subscribe(
          (res) => {
            if (res.status) {
              this.notyf.success('La lección fue agregada satisfactoriamente');
              this.getCourse(this._id);
              const scrollPosition = document.documentElement.scrollTop;
              document.scrollingElement.scrollTo();
              setTimeout(() => {
                window.scrollTo({
                  top: scrollPosition,
                  behavior: 'smooth',
                });
              }, 500);
              //data.reset();
            } else {
              this.notyf.error(
                'Ha ocurrido un error al intentar agregar la lección.'
              );
            }
          },
          (err) => {
            this.notyf.error(
              'Ha ocurrido un error al intentar agregar la lección.'
            );
          }
        );
    }
  }
  addSupportMaterial(videoId, content) {
    this.videoId = videoId;
    const modal = this._modalService.open(content, {
      size: 'md',
    });
    this.afuConfig2 = {
      multiple: true,
      formatsAllowed:
        '.mpeg, .zip, .rar, .docx, .doc, .ppt, .pptx, .xlsx, .xls, .jpg, .jpeg, .mp3, .mp4, .7zip, .txt, .3gp, .mp4, .pdf',
      maxSize: '2048',
      uploadAPI: {
        url: this.url + 'video/uploadSM/' + this.videoId,
        headers: {
          Authorization: this.token,
        },
      },
      theme: 'DragNDrop',
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      replaceTexts: {
        selectFileBtn: 'Seleccionar ficheros',
        resetBtn: 'Borrar',
        uploadBtn: 'Cargar ficheros',
        dragNDropBox: 'Drag N Drop',
        afterUploadMsg_success: 'fichero(s) cargado(s) correctamente.',
        afterUploadMsg_error: 'La carga falló',
      },
    };
  }
  uploadFiles(data) {
    if (data.body.status) {
      const modal = this._modalService.dismissAll();
      this.notyf.success('Ficheros cargados correctamente');
      this.getCourse(this._id);
    } else {
      this.notyf.error('Ocurrió un error al tratar de cargar los archivos');
    }
  }
  deleteSupportMaterial(videoId, smId, content) {
    const modal = this._modalService.open(content, {
      size: 'md',
    });
    modal.result.then((confirm) => {
      if (confirm) {
        this._videoService
          .deleteSupportMaterial(this.token, videoId, smId)
          .subscribe(
            (res) => {
              if (res.status) {
                modal.close();
                this.getCourse(this._id);
                this.notyf.success('Fichere eliminado correctamente.');
              } else {
                this.notyf.error(
                  'No se pudo eliminar el fichero. Por favor, vuelve a intentarlo.'
                );
              }
            },
            (err) => {
              if (err) {
                this.notyf.error(
                  'No se pudo eliminar el fichero. Por favor, vuelve a intentarlo.'
                );
              }
            }
          );
      }
    });
  }
  deleteVideo(_id, content, chapterId, lessonId) {
    const data = {
      chapterId,
      lessonId,
    };
    const modal = this._modalService.open(content, {
      size: 'md',
    });
    modal.result.then((confirm) => {
      if (confirm) {
        this._videoService
          .deleteVideo(this.token, data, _id, this._id)
          .subscribe(
            (res) => {
              if (res.status) {
                this.notyf.success('Video elimiando correctamente');
                modal.close();
                this.getCourse(this._id);
              } else {
                modal.close();
                this.notyf.error('No se pudo eliminar el video.');
              }
            },
            (err) => {
              modal.close();
              this.notyf.error(
                'Ocurrió un error. No se pudo eliminar el video.'
              );
              console.log(err);
            }
          );
      }
    });
  }
  onDropped(e, chapterIndex, chapterId) {
    const prev = e.previousIndex;
    const current = e.currentIndex;
    moveItemInArray(
      this._courseService.courseForEdit[chapterIndex].lesson,
      prev,
      current
    );
    if (prev == current) {
    } else {
      const lessonIds = this._courseService.courseForEdit[
        chapterIndex
      ].lesson.map((i) => i._id);
      const data = {
        position: chapterIndex,
        lessonsArray: lessonIds,
        chapterId,
      };

      this._courseService.reorderLessons(this.token, this._id, data).subscribe(
        (res) => {
          if (res.status) {
          } else {
            console.log('¡Done!');
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  onChapterDropped(e) {
    const prev = e.previousIndex;
    const current = e.currentIndex;
    moveItemInArray(this._courseService.courseForEdit, prev, current);

    if (prev == current) {
    } else {
      const chapterIds = this._courseService.courseForEdit.map((i) => i._id);

      const data = {
        chapterIds,
      };

      this._courseService.reorderChapters(this.token, this._id, data).subscribe(
        (res) => {
          if (res.status) {
          } else {
            console.log(res);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  showContent(e) {
    if ($(e.originalTarget).next().is(':visible')) {
      $(e.originalTarget).next().slideUp(300);
    } else {
      $(e.originalTarget).next().slideDown(300);
    }
  }
  onStartDragging(e) {
    $('.chapter-container').addClass('hide');
    if (this.autoZoom) {
      $('.sss').addClass('zoom');
    }
    /*window.scrollTo(
      0,
      Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      ) / 1.5
    );*/
  }
  onStopDragging(e) {
    $('.chapter-container').removeClass('hide');
    $('.sss').removeClass('zoom');
  }
  contraerTodo() {
    if ($('.chapter-container').is(':visible')) {
      $('.chapter-container').slideUp(300);
    } else {
      $('.chapter-container').slideDown(300);
    }
  }
  changeSettings() {
    if ($('#settings').is(':checked')) {
      localStorage.setItem('zoomOut', 'true');
      this.autoZoom = true;
    } else {
      localStorage.setItem('zoomOut', 'false');
      this.autoZoom = false;
    }
  }
  updateChapter(id, content, chapter) {
    const modal = this._modalService.open(content, {
      size: 'md',
    });
    const chapters = this._courseService.courseForEdit;
    for (let i = 0; i < chapters.length; i++) {
      const element = chapters[i];
      if (element._id == id) {
        this.toUpdate.title = element.chapterName;
        this.toUpdate.desc = element.chapterDesc;
      }
    }
    modal.result
      .then((confirm) => {
        if (confirm) {
          const data = {
            chapterName: this.toUpdate.title,
            chapterDesc: this.toUpdate.desc,
          };
          this._courseService
            .updateChapter(this.token, this._id, id, data)
            .subscribe(
              (res) => {
                if (res.status) {
                  this.notyf.success('El capítulo se actualizó correctamente.');
                  this.getCourse(this._id);
                  const scrollPosition = document.documentElement.scrollTop;
                  document.scrollingElement.scrollTo();
                  setTimeout(() => {
                    window.scrollTo(0, scrollPosition);
                  }, 500);
                } else {
                  this.notyf.error(
                    'El capítulo no se actualizó correctamente.'
                  );
                }
              },
              (err) => {
                this.notyf.error('Ha ocurrido un error inesperado.');
                console.log(err);
              }
            );
        } else {
        }
      })
      .catch((err) => {});
  }
  updateLesson(cid, lid, content, i) {
    const modal = this._modalService.open(content, {
      size: 'md',
    });
    const lessons = this._courseService.courseForEdit[i].lesson;
    for (let i = 0; i < lessons.length; i++) {
      const element = lessons[i];
      if (element._id == lid) {
        this.toUpdate.title = element.lessonName;
        this.toUpdate.desc = element.lessonDesc;
      }
    }
    modal.result.then((confirm) => {
      if (confirm) {
        const data = {
          lessonName: this.toUpdate.title,
          lessonDesc: this.toUpdate.desc,
        };
        this._courseService
          .updateLesson(this.token, this._id, cid, lid, data)
          .subscribe(
            (res) => {
              if (res.status) {
                this.notyf.success('La lección se actualizó correctamente.');
                this.getCourse(this._id);
                const scrollPosition = document.documentElement.scrollTop;
                document.scrollingElement.scrollTo();
                setTimeout(() => {
                  window.scrollTo(0, scrollPosition);
                }, 500);
              } else {
                this.notyf.error('La lección no se actualizó correctamente.');
              }
            },
            (err) => {
              this.notyf.error('Ha ocurrido un error inesperado.');
              console.log(err);
            }
          );
      } else {
      }
    });
  }
}
