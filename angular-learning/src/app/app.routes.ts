import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { CourseListComponent } from './pages/course-list/course-list';
import { StudentProfileComponent } from './pages/student-profile/student-profile';
import { StudentFormComponent } from './pages/student-form/student-form';
import { PipesDemoComponent } from './pages/pipes-demo/pipes-demo';
import { DirectivesDemoComponent } from './pages/directives-demo/directives-demo';

import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'courses',
    component: CourseListComponent,
    canActivate: [authGuard]
  },

  {
    path: 'profile',
    component: StudentProfileComponent,
    canActivate: [authGuard]
  },

  {
    path: 'student-form',
    component: StudentFormComponent,
    canActivate: [authGuard]
  },

  {
    path: 'pipes',
    component: PipesDemoComponent
  },

  {
    path: 'directives',
    component: DirectivesDemoComponent
  },

  {
    path: '**',
    redirectTo: ''
  }

];