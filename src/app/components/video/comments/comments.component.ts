import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommentService } from '../../../services/comment.service';
import { UserService } from '../../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NOTYF } from '../../../../assets/ts/notyf.token';
import { Notyf } from 'notyf';
import { stringUtil } from '../../../helpers/back-utilities/string-utilities';
import * as customBuild from '../../../../assets/EditorCustom/ckeditor';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  providers: [CommentService, UserService],
})
export class CommentsComponent implements OnInit {
  public commentId;
  public Editor = customBuild;
  public videoId;
  public comment;
  public comments;
  public token;
  public identity;
  public commentFU = {
    id: '',
    title: '',
    content: '',
  };

  public options: Object = {
    charCounterCount: true,
    attribution: false,
    language: 'es',
    placeholderText: 'Escribe un comentario',
    theme: 'dark',
  };

  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private _route: ActivatedRoute,
    private _router: Router,
    private _commentService: CommentService,
    private _userService: UserService,
    public _modalService: NgbModal
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.videoId = params.videoId;
      this.commentId = params.commentId;
    });

    this.getcomment();
    this.getCommentsInside();
  }

  getcomment() {
    this._commentService
      .getComment(this.videoId, this.commentId, this.token)
      .subscribe(
        (res) => {
          if ((res.status = 'success')) {
            this.comment = res.comment;
          } else {
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  openModalFDelete(content, option, cId) {
    switch (option) {
      case 0:
        this.commentFU.id = this.commentId;

        break;
      case 1:
        this._commentService
          .getCommentInside(this.videoId, this.commentId, cId, this.token)
          .subscribe(
            (res) => {
              if (res.status == 'success') {
                this.commentFU.id = cId;
              }
            },
            (err) => {
              console.log(err);
            }
          );

        break;
      default:
        break;
    }

    const modal = this._modalService.open(content, { size: 'md' });

    modal.result.then((confirm) => {
      if (confirm) {
        this.delete();
      }
    });
  }

  delete() {
    let myOption;

    if (this.commentFU.id == this.commentId) {
      myOption = 0;
    } else {
      myOption = 1;
    }

    switch (myOption) {
      case 0:
        this._commentService
          .delete(this.token, this.videoId, this.commentId)
          .subscribe(
            (res) => {
              if (res['status']) {
                this._router.navigate([
                  '/curso/video/reproducir',
                  this.videoId,
                ]);
              }
            },
            (err) => {
              console.log(err);
            }
          );

        break;
      case 1:
        this._commentService
          .deleteCXC(
            this.token,
            this.videoId,
            this.commentId,
            this.commentFU.id
          )
          .subscribe(
            (res) => {
              if (res['status']) {
                this.getCommentsInside();
              }
            },
            (err) => {
              console.log(err);
            }
          );

        break;
      default:
        break;
    }
  }

  getCommentsInside() {
    this._commentService
      .getCommentsInside(this.videoId, this.commentId, this.token)
      .subscribe(
        (res) => {
          if (res.status == 'success') {
            this.comments = res.comments.comments;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  openMainModal(content, option, cId) {
    switch (option) {
      case 0:
        this.commentFU.id = this.commentId;
        this.commentFU.title = this.comment.title;
        this.commentFU.content = this.comment.content;
        break;
      case 1:
        this._commentService
          .getCommentInside(this.videoId, this.commentId, cId, this.token)
          .subscribe(
            (res) => {
              if (res.status == 'success') {
                this.commentFU.id = cId;
                this.commentFU.title = res.comment.title;
                this.commentFU.content = res.comment.content;
              }
            },
            (err) => {
              console.log(err);
            }
          );

        break;
      default:
        break;
    }
    setTimeout(() => {
      const modal = this._modalService.open(content, { size: 'lg' });
    }, 200);
  }

  editMainComment() {
    const modal = this._modalService;
    let validation = false;
    let myOption;

    if (this.commentFU.id == this.commentId) {
      myOption = 0;
    } else {
      myOption = 1;
    }

    switch (myOption) {
      case 0:
        if (
          !stringUtil.isEmpty(this.commentFU.title) &&
          !stringUtil.isEmpty(this.commentFU.content)
        ) {
          validation = true;
        } else {
          //console.log('option 0');
          this.notyf.open({
            type: 'warning',
            message: 'No se puede actualiuzar si hay campos en blanco',
          });
        }
        break;
      case 1:
        if (!stringUtil.isEmpty(this.commentFU.content)) {
          validation = true;
        } else {
          //console.log('option 1');
          this.notyf.open({
            type: 'warning',
            message: 'No se puede actualizar un comentario en blanco',
          });
        }
        break;

      default:
        break;
    }

    if (validation) {
      switch (myOption) {
        case 0:
          this._commentService
            .update(this.token, this.commentFU, this.commentFU.id)
            .subscribe(
              (res) => {
                if (res.status == 'success') {
                  this.getcomment();
                  modal.dismissAll();
                }
              },
              (err) => {
                console.log(err);
              }
            );
          break;
        case 1:
          this._commentService
            .updateCXC(
              this.commentFU.content,
              this.token,
              this.videoId,
              this.commentId,
              this.commentFU.id
            )
            .subscribe(
              (res) => {
                if (res.status == 'success') {
                  this.getCommentsInside();
                  modal.dismissAll();
                }
              },
              (err) => {
                console.log(err);
              }
            );
          break;

        default:
          break;
      }
    }
  }
  onSubmit(form) {
    let content = form.value.content;

    this._commentService
      .createMoreComments(content, this.token, this.videoId, this.commentId)
      .subscribe(
        (res) => {
          //console.log(res);
          if (res.status == 'success') {
            this.getCommentsInside();
          }
        },
        (err) => {
          console.log(err);
        }
      );
    form.reset();
  }
}
