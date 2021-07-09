import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';
import { global } from '../../../../services/global';
import { environment } from '../../../../../environments/environment';
import { NOTYF } from '../../../../../assets/ts/notyf.token';
import { Notyf } from 'notyf';
import { stringUtil } from '../../../../helpers/back-utilities/string-utilities';
import * as customBuild from '../../../../../assets/EditorCustom/ckeditor';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [UserService],
})
export class AccountComponent implements OnInit {
  public pageTitle: string;
  public user: User;
  //public tabs;
  public Editor = customBuild;

  public status;
  public identity;
  public token;
  public url;
  public afuConfig;
  public resetVar;

  public options: Object = {
    charCounterCount: true,
    attribution: false,
    language: 'es',
    placeholderText: 'Edita aqui tu biografia',
    theme: 'dark',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
  };

  constructor(
    private _userService: UserService,
    @Inject(NOTYF) private notyf: Notyf
  ) {
    this.pageTitle = 'Ajustes de usuario';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = environment.url;
    //this.tabs = FrontUtilities.tabs;

    this.resetVar = true;
    this.afuConfig = {
      multiple: false,
      formatsAllowed: '.jpg, .jpeg, .png, .gif',
      maxSize: '50',
      uploadAPI: {
        url: this.url + 'user/upload-avatar',
        headers: {
          Authorization: this.token,
        },
      },
      theme: 'attachPin',
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      replaceTexts: {
        selectFileBtn: 'Select Files',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Sube tu foto...',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !',
      },
    };
  }

  ngOnInit(): void {
    console.log(this.user);
    console.log(this.user.name);
  }

  avatarUpload(data) {
    this.user.imagePath = data.body.user.imagePath;
  }

  onSubmit(form) {
    if (this.validationAlerts()) {
      this._userService.update(this.user).subscribe(
        (response) => {
          console.log(response);
          if (!response.user) {
            this.status = 'error';
          } else {
            this.status = 'success';
            localStorage.setItem('identity', JSON.stringify(response.user));
            this.notyf.success('Cambios guardados exitosamente');
          }
        },
        (error) => {
          this.status = 'error';
          console.log(error);
        }
      );
    }
  }

  validationAlerts() {
    let valid = true;

    if (stringUtil.isBlank(this.user.name)) {
      this.notyf.open({
        message: 'el campo "nombre" no puede estar vacios',
        duration: 5000,
        type: 'error',
      });

      valid = false;
    }

    if (stringUtil.isBlank(this.user.surname)) {
      this.notyf.open({
        message: 'el campo "apellido" no puede estar vacios',
        duration: 5000,
        type: 'error',
      });
      valid = false;
    }

    if (stringUtil.isBlank(this.user.email)) {
      this.notyf.open({
        message: 'el campo "email" no puede estar vacios',
        duration: 5000,
        type: 'error',
      });
      valid = false;
    }

    return valid;
  }
}
