import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { Comment } from '../../../models/comment';
import { User } from '../../../models/user';
import { UserService } from './../../../services/user.service';
import { CommentService } from './../../../services/comment.service';
import { stringUtil } from './../../../helpers/back-utilities/string-utilities';
import { NOTYF } from '../../../../assets/ts/notyf.token';
import { Notyf } from 'notyf';
import * as customBuild from '../../../../assets/EditorCustom/ckeditor';

@Component({
  selector: 'app-questions-answer',
  templateUrl: './questions-answer.component.html',
  styleUrls: ['./questions-answer.component.css'],
  providers: [UserService, CommentService],
})
export class QuestionsAnswerComponent implements OnInit {
  public videoTS;
  public Editor = customBuild;
  public commentsTS;
  public comment: Comment;
  public identity;
  public token;
  public countCommentsArray = [];
  public status;
  public options: Object = {
    charCounterCount: true,
    attribution: false,
    language: 'es',
    placeholderText: 'Escribe un comentario',
    theme: 'dark',
  };

  @Input()
  set comments(comm) {
    this.commentsTS = comm;
  }
  @Input()
  set videoId(str: string) {
    this.videoTS = str;
  }

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _commentService: CommentService,
    private _userService: UserService,
    @Inject(NOTYF) private notyf: Notyf
  ) {}

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.comment = new Comment('', '', '', null, '', '', '');
  }

  alertMssg() {
    if (
      stringUtil.isEmpty(this.comment.title) &&
      !stringUtil.isEmpty(this.comment.content)
    ) {
      this.notyf.open({
        message: 'Necesitas agregar un titulo al comentario',
        duration: 5000,
        type: 'warning',
      });
    } else if (
      stringUtil.isEmpty(this.comment.content) &&
      !stringUtil.isEmpty(this.comment.title)
    ) {
      this.notyf.open({
        message: 'Necesitas agregar un comentario primero',
        duration: 5000,
        type: 'warning',
      });
    } else {
      this.notyf.open({
        message: 'Se requiere un titulo y un comentario para proceder',
        duration: 5000,
        type: 'warning',
      });
    }
  }

  onSubmit(form) {
    this.countComments();
    // if (
    //   !stringUtil.isEmpty(this.comment.title) &&
    //   !stringUtil.isEmpty(this.comment.content)
    // ) {
    //   console.log(this.comment);
    //   this._commentService
    //     .create(this.comment, this.token, this.videoTS)
    //     .subscribe(
    //       (res) => {
    //         if (res.status == 'success') {
    //           this.commentsTS = res.newVideo.comments;
    //         }
    //       },
    //       (err) => {
    //         console.log(err);
    //       }
    //     );
    // } else {
    //   this.alertMssg();
    // }
    // form.reset();
  }

  countComments() {
    console.log(this.commentsTS);
    console.log('******************');
    //console.log(this.commentsTS[0].comments.length);

    this.commentsTS.forEach((element) => {
      console.log(element.comments.length);
      this.countCommentsArray.push(element.comments.length);
    });
    console.log(this.countCommentsArray);
  }
}
