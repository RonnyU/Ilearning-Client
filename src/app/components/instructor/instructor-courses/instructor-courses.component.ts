import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course';
import { UserService } from '../../../services/user.service';
import { global } from '../../../services/global';

@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  styleUrls: ['./instructor-courses.component.css'],
  providers: [CourseService, UserService],
})
export class InstructorCoursesComponent implements OnInit {
  public p: number;
  public userId;
  public courses: Array<Course>;
  public token;
  public url;
  public identity;
  @Input()
  set id(userId) {
    this.userId = userId;
  }
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _courseService: CourseService,
    private _userService: UserService
  ) {
    this.p = 1;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.userId = params.userId;
    });
    this.getMyCourses();
  }

  getMyCourses() {
    this._courseService.getCoursesByUser(this.userId).subscribe(
      (res) => {
        if (res.status) {
          this.courses = res.courses;
          console.log(this.courses);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  validarComprado(id, usId) {
    let comprado = false;
    if (usId == this.identity._id) {
      this._router.navigate(['/curso/video/reproducir/', id]);
    } else {
      for (let i = 0; i < this.identity.mycourses.length; i++) {
        const element = this.identity.mycourses[i];
        if (element == id) {
          comprado = true;
        }
      }
      if (!comprado) {
        this._router.navigate(['/curso/detalles/', id]);
      } else {
        this._router.navigate(['/curso/video/reproducir/', id]);
      }
    }
  }
}
