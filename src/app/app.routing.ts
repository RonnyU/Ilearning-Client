// importes necesarios
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdentityGuard } from './services/identity.guard';
// importar componentes
import { LoginComponent } from './components/login/login.component';
import { CreateCourseComponent } from './components/course/create-course/create-course.component';
import { CourseDetailsComponent } from './components/course/course-details/course-details.component';
import { CourseEditComponent } from './components/course/course-edit/course-edit.component';
import { SearchComponent } from './components/search/search.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AccountComponent } from './components/user/settings/account/account.component';
import { PrivacyComponent } from './components/user/settings/privacy/privacy.component';
import { CloseAccountComponent } from './components/user/settings/close-account/close-account.component';
import { ProfileComponent } from './components/student/profile.component';
import { PurchasedComponent } from './components/student/purchased/purchased.component';
import { ErrorComponent } from './components/error/error.component';
import { ManageCoursesComponent } from './components/course/manage-courses/manage-courses.component';
import { InstructorProfileComponent } from './components/instructor/instructor-profile/instructor-profile.component';
import { InstructorCoursesComponent } from './components/instructor/instructor-courses/instructor-courses.component';
import { PlayVideoComponent } from './components/video/play-video/play-video.component';
import { QuestionsAnswerComponent } from './components/video/questions-answer/questions-answer.component';
import { LessonMaterialComponent } from './components/video/lesson-material/lesson-material.component';
import { CommentsComponent } from './components/video/comments/comments.component';
import { BuyCourseComponent } from './components/course/buy-course/buy-course.component';

// DEFINIR LAS RUTAS
const appRoutes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  //{ path: 'curso/editar', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'buscar', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'inicio/:page', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  {
    path: 'configuracion/cuenta',
    component: AccountComponent,
    canActivate: [IdentityGuard],
  },
  {
    path: 'configuracion/privacidad',
    component: PrivacyComponent,
    canActivate: [IdentityGuard],
  },
  {
    path: 'configuracion/cerrar-cuenta',
    component: CloseAccountComponent,
    canActivate: [IdentityGuard],
  },
  {
    path: 'estudiante/perfil',
    component: ProfileComponent,
    canActivate: [IdentityGuard],
  },
  {
    path: 'estudiante/compras',
    component: PurchasedComponent,
    canActivate: [IdentityGuard],
  },
  {
    path: 'instructor/perfil/:userId',
    component: InstructorProfileComponent,
    canActivate: [IdentityGuard],
  },
  {
    path: 'instructor/courses',
    component: InstructorCoursesComponent,
    canActivate: [IdentityGuard],
  },
  { path: 'buscar/:search', component: SearchComponent },
  { path: 'buscar', component: SearchComponent },
  {
    path: 'curso/detalles/:id',
    component: CourseDetailsComponent,
  },
  {
    path: 'curso/nuevo',
    component: CreateCourseComponent,
    canActivate: [IdentityGuard],
  },

  {
    path: 'curso/editar/:courseId',
    component: CourseEditComponent,
    canActivate: [IdentityGuard],
  },

  {
    path: 'curso/manage-courses',
    component: ManageCoursesComponent,
    canActivate: [IdentityGuard],
  },
  {
    path: 'curso/manage-courses/:page',
    component: ManageCoursesComponent,
    canActivate: [IdentityGuard],
  },
  {
    path: 'curso/video/reproducir/:courseId',
    component: PlayVideoComponent,
    canActivate: [IdentityGuard],
  },
  {
    path: 'curso/video/preguntas-respuestas',
    component: QuestionsAnswerComponent,
    canActivate: [IdentityGuard],
  },
  {
    path: 'curso/video/material',
    component: LessonMaterialComponent,
    canActivate: [IdentityGuard],
  },
  {
    path: 'curso/adquirir-curso/:id',
    component: BuyCourseComponent,
    canActivate: [IdentityGuard],
  },
  {
    path: 'curso/video/comments/:videoId/:commentId',
    component: CommentsComponent,
    canActivate: [IdentityGuard],
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: ErrorComponent },
];

// EXPORTAR LA CONFIGURACION que luego se carga en el app.module
export const appRoutingProviders: any[] = []; // para cargar el router como servicio
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(
  appRoutes,
  {
    useHash: true,
    scrollPositionRestoration: 'enabled',
  }
);

// cargarlo dentro el app.module para que funcione la configuracion
