import { Component, ViewEncapsulation } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faGear, faXmark } from '@fortawesome/free-solid-svg-icons';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-params',
  standalone: true,
  imports: [
    SidebarModule,
    FontAwesomeModule
  ],
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ParamsComponent {

  faGear = faGear;
  faXmark = faXmark;
  isParamsBarVisible: boolean = false;

  onShowHideParamsBar(): boolean{
   return this.isParamsBarVisible = !this.isParamsBarVisible;
  }
}
