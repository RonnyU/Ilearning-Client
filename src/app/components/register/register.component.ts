import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { NOTYF } from '../../../assets/ts/notyf.token';
import { Notyf } from 'notyf';
import { Router } from '@angular/router';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService],
})
export class RegisterComponent implements OnInit {
  public pageTitle: string;
  public user: User;
  public status: string;

  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private _userService: UserService,
    private _router: Router
  ) {
    this.pageTitle = 'Registrate';
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
    // this.template = 'registro';
  }

  ngOnInit(): void {
    //console.log(this._userService.prueba());
  }

  onSubmit(form) {
    this.addClasses();
    if (this.user.password == form.value.confirmPassword) {
      this._userService.register(this.user).subscribe(
        (response) => {
          //console.log(response);
          if (response.user && response.user._id) {
            this.removeClasses();
            this.addSuccess();
            this.notyf.success('Registro correcto. Redirigiendo...');
            setTimeout(() => {
              this._router.navigate(['/login']);
            }, 3500);
          } else {
            let err: string;
            if (response.message == 'This user is already in the database')
              err = `<span>¡Hey! 
              Esta identifiación nos parece familiar. <strong>Prueba iniciando sesión.</strong></span>`;
            else {
              err =
                'Ha ocurrido un error. Asegurate de completar todos los campos.';
            }
            this.removeClasses();
            this.addDanger();
            this.notyf.open({
              message: err,
              duration: 5000,
              type: 'error',
            });
          }
        },
        (error) => {
          this.addDanger();
          this.removeClasses();
          console.log(error);
        }
      );
    } else {
      this.removeClasses();
      this.notyf.open({
        type: 'warning',
        message: 'Las contraseñas no coinciden.',
      });
    }
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
}
