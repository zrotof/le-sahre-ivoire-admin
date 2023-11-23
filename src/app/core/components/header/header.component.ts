import { Component } from '@angular/core';
import { UserConnectedMenuSideBarComponent } from '../user-connected-menu-side-bar/user-connected-menu-side-bar.component';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ParamsComponent } from '../params/params.component';
import { SideBarStateService } from '../../services/side-bar-state/side-bar-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone : true,
  imports: [
    NgClass,
    RouterLink,
    ParamsComponent,
    UserConnectedMenuSideBarComponent
  ]
})
export class HeaderComponent {

  isSideNavToggled !: boolean;

  constructor(
    private sidebarStateService : SideBarStateService
  ) { }

  onSideBarToggled(){
    this.isSideNavToggled = !this.isSideNavToggled;
    this.sidebarStateService.setSideBarState(this.isSideNavToggled)
  }
}
