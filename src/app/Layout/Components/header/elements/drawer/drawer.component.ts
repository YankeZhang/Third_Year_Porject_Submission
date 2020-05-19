import {Component, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../../../theme-options';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
})
export class DrawerComponent implements OnInit {
  toggleDrawer() {
    this.globals.toggleDrawer = !this.globals.toggleDrawer;
  }

  constructor(public globals: ThemeOptions) {
  }

  ngOnInit() {
  }

}
