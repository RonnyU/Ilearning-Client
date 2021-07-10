import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontUtilities } from '../../../../assets/front-utilities/front-utilities';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit {
  private id;
  private util;
  public data;
  public user = {
    name: '',
    surname: '',
  };
  public chapter;
  public url;
  public imageUrl;
  public vpath;
  public vtitle;
  public vprice;
  public vdesc;

  constructor(
    public _courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.getCourseDetails(this.id);
    });
    this.util = FrontUtilities;
    this.url = environment.url;
  }

  ngOnInit(): void {
    this.util.tabs();
    this.util.accordion();
  }

  getCourseDetails(id: string) {
    this._courseService.getCourse(id).subscribe((res) => {
      if (res.status) {
        this.data = res.course;
        this.imageUrl = this.url + 'course/image/' + this.data.imagePath;
        this.vpath = this.data.videoPath;
        this.vtitle = this.data.title;
        this.vprice = this.data.coursePrice;
        this.vdesc = this.data.courseDesc;
        this.user.name = this.data.user.name;
        this.user.surname = this.data.user.surname;
        this.chapter = this.data.chapter;
        //console.log(this.imageUrl);
      } else {
      }
    });
  }
  buyCourse() {
    this.router.navigate(['/curso/adquirir-curso/', this.id]);
  }
}
