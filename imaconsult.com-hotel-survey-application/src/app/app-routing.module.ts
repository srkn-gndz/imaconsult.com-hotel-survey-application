import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { GuestDetailComponent } from './guest-detail/guest-detail.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveyResultComponent } from './survey-result/survey-result.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'guest-detail',
    component: GuestDetailComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'survey',
    component: SurveyComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'survey-result',
    component: SurveyResultComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
