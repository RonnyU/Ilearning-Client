import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Inject } from '@angular/core';
import { NOTYF } from '../../../assets/ts/notyf.token';
import { Notyf } from 'notyf';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  public pageTitle: string;
  public user: User;
  public status: string;
  public identity;
  public token;

  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.pageTitle = 'Identificate';
    this.user = new User(
      '',
      '',
      '',
      '',
      '',
      0,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      true,
      null,
      '',
      ''
    );
  }

  ngOnInit(): void {}
  onSubmit(form) {
    this.enableAccount();

    $('.loading').removeClass('hide');
    $('.txt').addClass('hide');
    $('#btn-login').prop('disabled', true);
    this._userService.signup(this.user).subscribe(
      (response) => {
        //console.log(response);

        if (response.user && response.user._id) {
          // guardar el usuario en una propiedad
          this.identity = response.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));

          // Conseguir el token del usuario identificado
          this._userService.signup(this.user, true).subscribe(
            (res) => {
              this.removeClasses();
              if (res.token) {
                this.token = res.token;
                localStorage.setItem('token', this.token);
                this.status = 'success';
                this.addClasses();
                $('.txt').removeClass('hide');
                $('.loading').addClass('hide');
                this.addSuccess();
                $('.txt').html('Redirigiendo...');
                //this.notyf.success('Ingreso correcto. Redirigiendo...');
                setTimeout(() => {
                  this._router.navigate(['/inicio']);
                }, 1500);
              } else {
                this.removeClasses();
                this.addDanger();
                $('.txt').html('Credenciales incorrectas');
                this.notyf.error('Las credenciales no son correctas.');
                this.status = 'error';
              }
            },
            (err) => {
              this.removeClasses();
              this.addDanger();
              $('.txt').html('Credenciales incorrectas');
              this.notyf.error('Las credenciales no son correctas.');
            }
          );
        } else {
          this.removeClasses();
          this.addDanger();
          $('.txt').html('Credenciales incorrectas');
          this.notyf.error('Las credenciales no son correctas.');
        }
      },
      (error) => {
        this.removeClasses();
        this.addDanger();
        $('.txt').html('Credenciales incorrectas');
        this.notyf.error('Las credenciales no son correctas.');
      }
    );
  }
  removeClasses() {
    $('.loading').addClass('hide');
    $('.txt').removeClass('hide');
    $('#btn-login').prop('disabled', false);
  }
  addClasses() {
    $('.loading').removeClass('hide');
    $('.txt').addClass('hide');
    $('#btn-login').prop('disabled', true);
  }
  addDanger() {
    $('#btn-login').addClass('btn-danger');
  }
  addSuccess() {
    $('#btn-login').removeClass('btn-danger');
    $('#btn-login').addClass('btn-success');
  }

  enableAccount() {
    this._userService.enableAccount(this.user.identity).subscribe(
      (response) => {
        //console.log(response);
        if (!response.status) {
          this.notyf.error(
            'ha habido un problema al reactivar tu cuenta, ponte en contacto con los administradores'
          );

          //console.log(response.message);
        }
      },
      (error) => {
        console.log('error al reactivar la cuenta');
      }
    );
  }

  noavailable() {
    this.notyf.open({
      message: 'These options have been disabled for this test',
      type: 'warning',
      duration: 3500,
    });
  }
}
