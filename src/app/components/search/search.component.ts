import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CourseService } from '../../services/course.service';
import { CategoryService } from '../../services/category.service';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [UserService],
})
export class SearchComponent implements OnInit {
  searchValue: string;
  foundCourses: number = 0;
  public found: boolean = false;
  public identity;
  public url;

  constructor(
    private route: ActivatedRoute,
    public _courseService: CourseService,
    public _categoryService: CategoryService,
    public _userService: UserService,
    public _router: Router
  ) {
    this.route.paramMap.subscribe((params) => {
      this.searchValue = params.get('search');
      this.getFoundCourses(this.searchValue);
      console.log(this.searchValue);
    });
    this.identity = _userService.getIdentity();
    this.url = environment.url;
  }

  ngOnInit(): void {
    this.listCategories();
  }

  getFoundCourses(searchValue: string) {
    this._courseService.searchCourses(searchValue).subscribe((res) => {
      if (res) {
        if (res.status) {
          if (res.courses.length > 0) {
            this.found = true;
          } else {
            this.found = false;
          }
          this.foundCourses = res.courses.length;
          this._courseService.searchCourseData = res.courses;
        } else {
          this.foundCourses = 0;
          this.found = false;
          this._courseService.searchCourseData = [];
        }
      } else {
        this.found = false;
        this._courseService.searchCourseData = [];
      }
    });
  }
  listCategories() {
    this._categoryService.getCategories().subscribe((res) => {
      if (res) {
        if (res.status) {
          this._categoryService.categoryData = res.categories;
        } else {
        }
      } else {
      }
    });
  }
  validarComprado(id) {
    let comprado = false;
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
