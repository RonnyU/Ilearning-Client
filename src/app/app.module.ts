import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';

//* importe de librerias aqui
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
// Import all Froala Editor plugins.
import 'froala-editor/js/plugins.pkgd.min.js';
// Import a Froala Editor language file.
import 'froala-editor/js/languages/de.js';
// Import a third-party plugin.
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/third_party/embedly.min';

//Pipe for orderArray
import { ArraySortPipe } from './orderBy';

//Ngx pagination | dynamic pagination for tables like datatable
import { NgxPaginationModule } from 'ngx-pagination';

//Angular CDK components
import { DragDropModule } from '@angular/cdk/drag-drop';

//Custom video player
import { PlyrModule } from 'ngx-plyr';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { MomentModule } from 'angular2-moment';
import { NOTYF, notyfFactory } from '../assets/ts/notyf.token';

//* importe de servicios
import { IdentityGuard } from './services/identity.guard';
import { UserService } from './services/user.service';

//* Importe de rutas aqui
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AccountComponent } from './components/user/settings/account/account.component';
import { NotificationComponent } from './components/user/settings/notification/notification.component';
import { BillingComponent } from './components/user/settings/billing/billing.component';
import { PrivacyComponent } from './components/user/settings/privacy/privacy.component';
import { CloseAccountComponent } from './components/user/settings/close-account/close-account.component';
import { SearchComponent } from './components/search/search.component';
import { CourseDetailsComponent } from './components/course/course-details/course-details.component';
import { CreateCourseComponent } from './components/course/create-course/create-course.component';
import { ProfileComponent } from './components/student/profile.component';
import { PurchasedComponent } from './components/student/purchased/purchased.component';
import { DiscussionComponent } from './components/student/discussion/discussion.component';
import { SubscriptionComponent } from './components/student/subscription/subscription.component';
import { CourseEditComponent } from './components/course/course-edit/course-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorComponent } from './components/error/error.component';
import { ManageCoursesComponent } from './components/course/manage-courses/manage-courses.component';
import { InstructorProfileComponent } from './components/instructor/instructor-profile/instructor-profile.component';
import { InstructorDiscussionComponent } from './components/instructor/instructor-discussion/instructor-discussion.component';
import { InstructorCoursesComponent } from './components/instructor/instructor-courses/instructor-courses.component';
import { PlayVideoComponent } from './components/video/play-video/play-video.component';
import { QuestionsAnswerComponent } from './components/video/questions-answer/questions-answer.component';
import { LessonMaterialComponent } from './components/video/lesson-material/lesson-material.component';
import { VideoPlayerComponent } from './components/video/video-player/video-player.component';
import { CommentsComponent } from './components/video/comments/comments.component';
import { BuyCourseComponent } from './components/course/buy-course/buy-course.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    AccountComponent,
    NotificationComponent,
    BillingComponent,
    PrivacyComponent,
    CloseAccountComponent,
    SearchComponent,
    CourseDetailsComponent,
    CreateCourseComponent,
    ProfileComponent,
    PurchasedComponent,
    DiscussionComponent,
    SubscriptionComponent,
    ArraySortPipe,
    CourseEditComponent,
    ErrorComponent,
    ManageCoursesComponent,
    InstructorProfileComponent,
    InstructorDiscussionComponent,
    InstructorCoursesComponent,
    PlayVideoComponent,
    QuestionsAnswerComponent,
    LessonMaterialComponent,
    VideoPlayerComponent,
    CommentsComponent,
    BuyCourseComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    NgxDropzoneModule,
    MomentModule,
    NgbModule,
    NgxPaginationModule,
    DragDropModule,
    PlyrModule,
    CKEditorModule,
  ],
  providers: [
    appRoutingProviders,
    { provide: NOTYF, useFactory: notyfFactory },
    IdentityGuard,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
