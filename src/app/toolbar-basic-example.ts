import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './module/user/user.service';

/**
 * @title Basic toolbar
 */
@Component({
  selector: 'toolbar-basic-example',
  templateUrl: 'toolbar-basic-example.html',
  styleUrls: ['toolbar-basic-example.css'],
})
export class ToolbarBasicExample implements OnInit {
  user: any;
  constructor(private router: Router, private service: UserService){}
  ngOnInit(): void {
    this.service.getCurrentUser().subscribe(res => {
      if(res){
        console.log("===",res)
        this.user = res
      }
    })
  }

  card: string = "user";

  Navigate(url: any){
    this.card = url;
    this.router.navigate([url])
    if(url == "login"){
      this.user = null;
      localStorage.removeItem('token');
    }
  }
  home(){
    this.router.navigate(['home'])
  }
}


/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */