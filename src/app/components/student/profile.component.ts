import { Component, OnInit } from '@angular/core';
import { FrontUtilities } from '../../../assets/front-utilities/front-utilities';
import { UserService } from '../../services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService],
})
export class ProfileComponent implements OnInit {
  public tabs;
  public user;
  public url;
  public totalCourses;
  public myCourses;

  constructor(private _userService: UserService) {
    this.tabs = FrontUtilities.tabs;
    this.user = _userService.getIdentity();
    this.url = environment.url;
  }

  ngOnInit(): void {
    this.getMyCourses();
    this.tabs();
  }

  getMyCourses() {
    this._userService.getMyCourses().subscribe(
      (response) => {
        if (response.mycourses) {
          this.myCourses = response.mycourses;

          this.totalCourses = this.myCourses.length;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
