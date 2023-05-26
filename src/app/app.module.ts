import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialExampleModule} from '../material.module';
import {ToolbarBasicExample} from './toolbar-basic-example';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './module/user/user.component';
import { PageNotFoundComponent } from './module/page-not-found/page-not-found.component';
import { LoginComponent } from './module/login/login.component';
import { TokenInterceptor } from './interceptor/jwt/jwt.interceptor';
import { TableComponent } from './common/table/table.component';
import { DialogFilterComponent } from './common/dialog-filter/dialog-filter.component';
import { DialogAddComponent } from './common/dialog-add/dialog-add.component';
import { HttpRequestInterceptor } from './interceptor/loading/http-request-interceptor';
import { UserDetailComponent } from './module/user/user-detail/user-detail.component';
import { DialogMessageComponent } from './common/dialog-message/dialog-message.component';
import { HttpErrorInterceptor } from './interceptor/http-err/http-error.interceptor';
import { DayOffComponent } from './module/day-off/day-off.component';

@NgModule({
  declarations: [
    ToolbarBasicExample, 
    UserComponent, PageNotFoundComponent, LoginComponent, TableComponent, DialogFilterComponent, DialogAddComponent, UserDetailComponent, DialogMessageComponent, DayOffComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [ToolbarBasicExample],
})
export class AppModule {}
