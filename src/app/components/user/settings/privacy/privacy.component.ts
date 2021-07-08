import { Component, OnInit, Inject } from '@angular/core';
import { Pass } from '../../../../models/pass';
import { UserService } from '../../../../services/user.service';
import { NOTYF } from '../../../../../assets/ts/notyf.token';
import { Notyf } from 'notyf';
import { stringUtil } from '../../../../helpers/back-utilities/string-utilities';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
  providers: [UserService],
})
export class PrivacyComponent implements OnInit {
  //public user: User;
  //public identity;
  //public token;
  pass: Pass;
  public status;

  constructor(
    private _userService: UserService,
    @Inject(NOTYF) private notyf: Notyf
  ) {
    //this.identity = this._userService.getIdentity();
    //this.token = this._userService.getToken();
    //this.user = this.identity;
    this.pass = new Pass('', '', '');
  }

  ngOnInit(): void {}

  onSubmit(form) {
    if (
      !stringUtil.isBlank(this.pass.currentpassword) ||
      !stringUtil.isBlank(this.pass.newpassword) ||
      !stringUtil.isBlank(this.pass.confirmpassword)
    ) {
      if (this.pass.newpassword == this.pass.confirmpassword) {
        this._userService.updatePassword(this.pass).subscribe(
          (response) => {
            console.log(response);
            if (response.status) {
              this.status = 'success';
              this.validationAlerts(0);
            } else if ((response.message = 'Wrong credentials')) {
              this.validationAlerts(1);
            } else {
              this.status = 'error';

              console.log('no se encontro el usuario');
            }
          },
          (error) => {
            this.status = 'error';
            console.log(error);
          }
        );
      } else {
        this.validationAlerts(2);
      }
    } else {
      this.validationAlerts(1);
    }

    form.reset();
  }

  validationAlerts(option) {
    switch (option) {
      case 0: {
        this.notyf.success('Cambios guardados exitosamente');
        break;
      }
      case 1: {
        this.notyf.open({
          message: 'Contraseña incorrecta',
          duration: 5000,
          type: 'error',
        });
        break;
      }
      case 2: {
        this.notyf.open({
          message: 'Las contraseñas no coinciden',
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
}
