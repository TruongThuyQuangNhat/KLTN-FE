import {Component} from '@angular/core';
import { Router } from '@angular/router';

/**
 * @title Basic toolbar
 */
@Component({
  selector: 'toolbar-basic-example',
  templateUrl: 'toolbar-basic-example.html',
  styleUrls: ['toolbar-basic-example.css'],
})
export class ToolbarBasicExample {
  constructor(private router: Router){}

  card: string = "user";

  Navigate(url: any){
    this.card = url;
    this.router.navigate([url])
  }
}


/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */