import {Component} from '@angular/core';
import {ConfigActions} from '../store/config.actions';
import {ThemeOptions} from '../../theme-options'

@Component({
  selector: 'app-options-drawer',
  templateUrl: './options-drawer.component.html',
})
export class OptionsDrawerComponent {

  toggleOptionsDrawer() {
    this.globals.toggleThemeOptions = !this.globals.toggleThemeOptions;
  }

  toggleFixedFooter() {
    this.globals.toggleFixedFooter = !this.globals.toggleFixedFooter;
  }

  constructor(public globals: ThemeOptions,
              public configActions: ConfigActions) {
  }

}
