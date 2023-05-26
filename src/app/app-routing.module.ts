import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./module/login/login.component";
import { PageNotFoundComponent } from "./module/page-not-found/page-not-found.component";
import { UserComponent } from "./module/user/user.component";
import { UserDetailComponent } from "./module/user/user-detail/user-detail.component";
import { DayOffComponent } from "./module/day-off/day-off.component";
import { DetailDayoffComponent } from "./module/day-off/detail-dayoff/detail-dayoff.component";
import { SalaryComponent } from "./module/salary/salary.component";
import { HistorySalaryComponent } from "./module/salary/history-salary/history-salary.component";

export const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'user/:id',
    component: UserDetailComponent,
  },
  {
    path: 'dayoff',
    component: DayOffComponent,
  },
  {
    path: 'dayoff/:id',
    component: DetailDayoffComponent,
  },
  {
    path: 'salary',
    component: SalaryComponent,
  },
  {
    path: 'salary/history/:id',
    component: HistorySalaryComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
