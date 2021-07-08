import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { CategoryService } from '../../services/category.service';
import { CourseService } from '../../services/course.service';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NOTYF } from '../../../assets/ts/notyf.token';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CourseService, CategoryService, UserService],
})
export class HomeComponent implements OnInit {
  public status;
  public url;
  public totalPages;
  public numberPages;
  public page;
  public nextPage;
  public prevPage;
  public courses;
  public identity;

  categories: [];

  constructor(
    private _route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private _router: Router,
    @Inject(NOTYF) private notyf: Notyf,
    public _categoryService: CategoryService,
    private _courseService: CourseService,
    private _userService: UserService
  ) {
    this.url = environment.url;
    this.identity = _userService.getIdentity();
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this._route.params.subscribe((params) => {
      let page = +params.page;

      if (!page || page == null || page === undefined) {
        page = 1;
        this.prevPage = 1;
        this.nextPage = 2;
      }
      this.getCourses(page);
    });
    this.listCategories();
  }

  getCourses(page = 1) {
    this._courseService.getCourses(page).subscribe(
      (response) => {
        if (response.courses) {
          this.courses = response.courses;
          // navegacion de paginacion

          this.totalPages = response.totalPages;

          const arrayPages = [];

          for (let i = 1; i <= this.totalPages; i++) {
            arrayPages.push(i);
          }
          this.numberPages = arrayPages;

          if (page >= 2) {
            this.prevPage = page - 1;
          } else {
            this.prevPage = 1;
          }

          if (page < this.totalPages) {
            this.nextPage = page + 1;
          } else {
            this.nextPage = this.totalPages;
          }
        } else {
          this._router.navigate(['/inicio']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  listCategories() {
    this._categoryService.getCategories().subscribe((res) => {
      if (res) {
        this._categoryService.categoryData = res.categories;
      } else {
      }
    });
  }
  validarComprado(id) {
    let comprado = false;
    console.log(this.identity);
    if (this.identity != null) {
      for (let i = 0; i < this.identity.mycourses.length; i++) {
        console.log(this.identity.mycourses[i]);
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
    } else {
      this._router.navigate(['/curso/detalles/', id]);
    }
  }

  noavailable() {
    this.notyf.open({
      message:
        'Oops! Lo sentimos pero esta opcion no esta habilida, se encuentra aun en desarrollo',
      type: 'info',
      duration: 4500,
    });
  }
}
