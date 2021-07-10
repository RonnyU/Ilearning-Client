import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course';
import { UserService } from '../../../services/user.service';
import { global } from '../../../services/global';

@Component({
  selector: 'app-purchased',
  templateUrl: './purchased.component.html',
  styleUrls: ['./purchased.component.css'],
  providers: [CourseService, UserService],
})
export class PurchasedComponent implements OnInit {
  public p: number;
  public courses: Array<Course>;
  public token;
  public url;
  constructor(
    private _courseService: CourseService,
    private _userService: UserService
  ) {
    this.p = 1;
    this.token = _userService.getToken();
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getMyCourses();
  }

  getMyCourses() {
    this._userService.getMyCourses().subscribe(
      (res) => {
        if ((res.status = 'success')) {
          this.courses = res.mycourses;
          //console.log(res);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
