import {Component, Input} from '@angular/core';

@Component({
  selector: 'ibm-app-page-title',
  templateUrl: './page-title.component.html',
})
export class IBMPageTitleComponent {

  @Input() heading;
  @Input() subheading;
  @Input() icon;

}
