import { Component, OnInit, Inject } from '@angular/core';
import { Pass } from '../../../../models/pass';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { NOTYF } from '../../../../../assets/ts/notyf.token';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-close-account',
  templateUrl: './close-account.component.html',
  styleUrls: ['./close-account.component.css'],
  providers: [UserService],
})
export class CloseAccountComponent implements OnInit {
  pass: Pass;
  public confirmation;
  public color;
  private darkMode;
  private clicked;
  public identity;
  public token;

  constructor(
    private _userService: UserService,
    private _router: Router,
    @Inject(NOTYF) private notyf: Notyf
  ) {
    this.pass = new Pass('', '', '');
    this.color = '';
    this.clicked = true;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    //console.log(this.user);
  }

  ngDoCheck() {
    this.darkMode = localStorage.getItem('darkMode');

    if (this.darkMode == 'off' && !this.clicked) {
      this.color = '#E43636';
    }
    if (this.darkMode == 'on' && !this.clicked) {
      this.color = '#B234F1';
    }
  }

  onSubmit(form) {
    if (form.value.confirmationCheck) {
      //console.log('paso confirmationcheck');

      if (this.pass.currentpassword == this.pass.confirmpassword) {
        //console.log('paso clave actual y confirmacion');
        this._userService.disableAccount(this.pass).subscribe(
          (response) => {
            //console.log(response);
            if (response.status) {
              this.validationAlerts(0);
              this.logOut();
            } else if ((response.message = 'Wrong credentials')) {
              this.validationAlerts(4);
            } else {
              this.validationAlerts(2);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.validationAlerts(3);
      }
    } else {
      this.validationAlerts(1);
    }

    form.reset();
  }

  validationAlerts(option) {
    switch (option) {
      case 0: {
        this.notyf.success('Cuenta desabilitada con exito');
        break;
      }
      case 1: {
        this.clicked = false;
        this.notyf.open({
          message:
            'Marque la opcion "Si, quiero cerrar mi cuenta" para continuar',
          duration: 5000,
          type: 'warning',
        });

        if ((this.darkMode = 'on')) {
          this.color = '#B234F1';
        } else {
          this.color = '#E43636';
        }
        break;
      }
      case 2: {
        this.notyf.open({
          message: 'No se pudo desabilitar la cuenta',
          duration: 5000,
          type: 'error',
        });
        break;
      }
      case 3: {
        this.notyf.open({
          message: 'Las contraseñas no coinciden',
          duration: 5000,
          type: 'warning',
        });
        break;
      }
      case 4: {
        this.notyf.open({
          message: 'La contraseña es incorrecta',
          duration: 5000,
          type: 'warning',
        });
        break;
      }
      default: {
        console.log('algo ha salido mal en validationAlerts');
      }
    }
  }
  changeColor() {
    this.color = '';

    this.clicked = true;
  }
  logOut() {
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/inicio']);
  }
}
