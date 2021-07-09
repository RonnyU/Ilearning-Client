import { Component, OnInit } from '@angular/core';
import { FrontUtilities } from '../../../../assets/front-utilities/front-utilities';
import { global } from '../../../services/global';
import { CourseService } from '../../../services/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Comment } from '../../../models/comment';

@Component({
  selector: 'app-play-video',
  templateUrl: './play-video.component.html',
  styleUrls: ['./play-video.component.css'],
})
export class PlayVideoComponent implements OnInit {
  public token;
  public title;
  public tabs;
  public url;
  public _id;
  public videoFileName;
  public comments: Array<Comment>;
  public videoId;
  public sM;
  public course;

  constructor(
    public _courseService: CourseService,
    private route: ActivatedRoute,
    private _router: Router,
    public _userService: UserService
  ) {
    this.token = this._userService.getToken();
    this.tabs = FrontUtilities.tabs;
    this.url = global.url;
    this.route.paramMap.subscribe((params) => {
      this._id = params.get('courseId');
    });
    this.videoFileName = 'novideo';
  }

  ngOnInit(): void {
    this.tabs();
    this.getCourse(this._id);
  }
  getCourse(_id: string) {
    this._courseService.getPopulatedCourse(_id, this.token).subscribe((res) => {
      if (res.status) {
        this.course = res.course[0];

        this._courseService.courseForEdit = res.course[0].chapter.sort((a, b) =>
          a.position > b.position ? 1 : b.position > a.position ? -1 : 0
        );

        this.title = res.course[0].title;
      } else {
        console.log('error');
      }
    });
  }
  LoadVideo(videoName, comments, videoId, sm) {
    this.videoFileName = videoName;
    this.comments = comments;
    //console.log(this.comments);
    this.videoId = videoId;
    this.sM = sm;
  }

  RefreshComments(comment) {
    this.comments.push(comment);
  }
}
