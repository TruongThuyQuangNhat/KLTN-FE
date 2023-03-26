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

@NgModule({
  declarations: [
    ToolbarBasicExample, 
    UserComponent, PageNotFoundComponent, LoginComponent, TableComponent, DialogFilterComponent
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
  ],
  bootstrap: [ToolbarBasicExample],
})
export class AppModule {}
