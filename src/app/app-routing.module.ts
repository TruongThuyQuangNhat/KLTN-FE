import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./module/login/login.component";
import { PageNotFoundComponent } from "./module/page-not-found/page-not-found.component";
import { UserComponent } from "./module/user/user.component";
import { UserDetailComponent } from "./module/user/user-detail/user-detail.component";

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
