import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLaptop, faReceipt, faUtensils, faBullhorn, faGear, faCirclePlay, faUsers, faNewspaper, faAngleDown, faUserTie, faCalendarAlt, faChartLine, faVideoCamera,  } from '@fortawesome/free-solid-svg-icons';
import { SideBarStateService } from '../../services/side-bar-state/side-bar-state.service';

@Component({
  selector: 'app-side-bar-navigation',
  templateUrl: './side-bar-navigation.component.html',
  styleUrls: ['./side-bar-navigation.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgFor,
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule
  ]
})
export class SideBarNavigationComponent implements OnInit {

  @Input() screenWidth !: number;
  
  isSideNavToggled !: boolean;

  faUsers = faUsers;
  faCalendarAlt = faCalendarAlt;
  faChartLine = faChartLine;
  faAngleDown = faAngleDown;
  faNewspaper = faNewspaper;
  faCamera = faVideoCamera;
  faUserTie = faUserTie;
  faCirclePlay = faCirclePlay;
  faGear = faGear;
  faBullhorn = faBullhorn;
  faUtensils = faUtensils;
  faReceipt = faReceipt;
  faLaptop = faLaptop;

  menuList !: any;

  constructor(
    private sidebarStateService : SideBarStateService
  ) {
  }

  ngOnInit(): void {
    this.initMenus();
    this.getSideBarState();
  }

  initMenus(){
    this.menuList = [
      {
        icon: this.faChartLine,
        label: "Dasboard",
        url: "/"
      },
      {
        icon: this.faBullhorn,
        label: "Annonces",
        url: "annonces"
      },
      {
        icon: this.faReceipt,
        label: "Commandes",
        url: "/b"
      },
      {
        icon: this.faUtensils,
        label: "Plats",
        url: "/c"
      },
      {
        icon: this.faLaptop,
        label: "Site web",
        url: "/d"
      },
      {
        icon: this.faUsers,
        label: "Menu",
        url: "/e"
      }
    ]
  }

  onItemMenuClicked( index: number){
    this.menuList[index].active = !this.menuList[index].active;
  }

  getSideBarState(){
    this.sidebarStateService.getSideBarState().subscribe({
      next : (res: boolean) => {
        this.isSideNavToggled = res;
      }
    })
  }

  onSideBarToggled(){
    this.isSideNavToggled = !this.isSideNavToggled;
    this.sidebarStateService.setSideBarState(this.isSideNavToggled)
  }

}
