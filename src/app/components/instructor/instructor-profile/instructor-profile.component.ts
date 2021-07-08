import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FrontUtilities } from '../../../../assets/front-utilities/front-utilities';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course';
import { UserService } from '../../../services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.css'],
  providers: [UserService, CourseService],
})
export class InstructorProfileComponent implements OnInit {
  public tabs;
  public user;
  public userId;
  public courses: Array<Course>;
  public countStudents: number;
  public countCourses;
  public url;
  public token;
  public totalOfStudents;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _courseService: CourseService
  ) {
    this.tabs = FrontUtilities.tabs;
    this.url = environment.url;
    this.token = _userService.getToken();
    this.countStudents = 0;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.userId = params.userId;
    });

    this.tabs();
    this.getmyCourses();
    this.getInstructor();
  }

  getInstructor() {
    this._userService.getUser(this.userId).subscribe(
      (res) => {
        if ((res.status = 'success')) {
          this.user = res.user;
          console.log(this.url + 'user/avatar/' + this.user.imagePath);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getmyCourses() {
    this._courseService.getCoursesByUser(this.userId).subscribe(
      (res) => {
        if (res.status) {
          this.courses = res.courses;

          this.courses.forEach((element) => {
            this.countStudents += element.purchases;
          });

          this.countCourses = this.courses.length;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
