import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { global } from '../../services/global';
import { environment } from '../../../environments/environment';
import { UserService } from '../../services/user.service';
import { NOTYF } from '../../../assets/ts/notyf.token';
import { Notyf } from 'notyf';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [UserService],
})
export class NavbarComponent implements OnInit {
  public title = 'CCC';
  public identity;
  public token;
  public url;
  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private _userService: UserService,
    private _router: Router
  ) {
    this.loadUser();
    this.url = environment.url;
  }
  ngOnInit() {
    //console.log(this.identity);
    //console.log(this.token);
    this.DarkMode();
  }
  ngDoCheck() {
    this.loadUser();
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    //console.log(this.identity);
    this.token = this._userService.getToken();
  }

  logOut() {
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/inicio']);
  }

  DarkMode() {
    // if (localStorage.getItem('darkMode') == 'off') {
    //   $('.round').removeClass('boll-right');
    //   $('body').removeClass('dark-body');
    //   var newThemeColor = 'assets/css/color-themes/theme-twelve.css';
    //   var targetCSSFile = $('link[id="theme-color-file"]');
    //   $(targetCSSFile).attr('href', newThemeColor);
    // } else {
    //   $('.round').addClass('boll-right');
    //   $('body').addClass('dark-body');
    //   var newThemeColor = 'assets/css/color-themes/theme-two.css';
    //   var targetCSSFile = $('link[id="theme-color-file"]');
    //   $(targetCSSFile).attr('href', newThemeColor);
    // }
    $('.hidden-bar-opener').on('click', function () {
      $('.hidden-bar').toggleClass('visible-sidebar');
      $('.sidenav-list').toggleClass('custom_left_sidebar');
    });
    // $('.off').on('click', () => {
    //   $('.round').removeClass('boll-right');
    //   $('body').removeClass('dark-body');
    //   var newThemeColor = 'assets/css/color-themes/theme-twelve.css';
    //   var targetCSSFile = $('link[id="theme-color-file"]');
    //   $(targetCSSFile).attr('href', newThemeColor);
    //   //localStorage.setItem('darkMode', 'off');
    // });
    // $('.on').on('click', () => {
    //   $('.round').addClass('boll-right');
    //   $('body').addClass('dark-body');
    //   var newThemeColor = 'assets/css/color-themes/theme-two.css';
    //   var targetCSSFile = $('link[id="theme-color-file"]');
    //   $(targetCSSFile).attr('href', newThemeColor);
    //   //localStorage.setItem('darkMode', 'on');
    // });
    $('.scroll-to-target').on('click', function () {
      var target = $(this).attr('data-target');
      // animate
      $('html, body').animate(
        {
          scrollTop: $(target).offset().top,
        },
        1500
      );
    });
    var ignoreClickOnMeElement5 = document.getElementById('someElementID5');

    $(document).on('click', function (event) {
      var isClickInsideElement5 = ignoreClickOnMeElement5.contains(
        event.target
      );

      if (!isClickInsideElement5) {
        $('.btn.btn-default.dropdown-toggle')
          .parent()
          .removeClass('dropdown-active');
      }
    });
  }
  search(data) {
    if (data.searchValue == undefined || data.searchValue.trim() == '') {
    } else {
      const searchValue = data.searchValue;
      this._router.navigate(['/buscar', searchValue]);
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
