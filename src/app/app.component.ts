import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import * as JWT from 'jwt-decode';
import * as AOS from 'aos';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { SideBarStateService } from './core/services/side-bar-state/side-bar-state.service';
import { AuthService } from './core/services/auth/auth.service';
import { UsersService } from './core/services/users/users.service';

import { SideBarNavigationComponent } from './core/components/side-bar-navigation/side-bar-navigation.component';
import { HeaderComponent } from './core/components/header/header.component';

import { faFaceLaugh } from '@fortawesome/free-solid-svg-icons';
import { faFaceMehBlank, faFaceMeh, faFaceSmile } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone : true,
  imports : [
    AsyncPipe,
    NgClass,
    NgIf,
    RouterOutlet,
    FontAwesomeModule,
    HeaderComponent,
    SideBarNavigationComponent
  ]
})
export class AppComponent implements OnInit {
  title = 'sahre-ivoire-pro';

  isUserLogged$ !: Observable<boolean>;

  isSideNavToggled !: boolean;

  screenWidth !: number;

  styleClass = '';

  currentSideBarState$ !: Observable<boolean>;

  connectedUserId !: string;

  constructor(
    private authService : AuthService,
    private userService : UsersService,
    private sidebarStateService : SideBarStateService
  ){}

  ngOnInit(): void {
    AOS.init();
    this.initAppOnReload();
    this.onResize();
    this.isUserLogged$ = this.authService.isLogged$
  }
  
  onGetCssClass( sideNavState : boolean, screenWidth : number){
    if(sideNavState === false && screenWidth > 768){
      this.styleClass = 'wrapper-not-toggled'
    }

    else if(sideNavState === true && screenWidth > 768){
      this.styleClass = 'wrapper-toggled'
    }

    else if(sideNavState === true && screenWidth <= 768 && screenWidth > 0){
      this.styleClass = 'wrapper-toggled'
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(){
    this.screenWidth = window.innerWidth;
  
    if(this.screenWidth <= 768){
      this.isSideNavToggled = true;
    }
    else{
      if(!this.isSideNavToggled){
        this.isSideNavToggled = false
      }
    }
    
    this.onGetCssClass(this.isSideNavToggled, this.screenWidth);
    this.sidebarStateService.setSideBarState(this.isSideNavToggled)
  }

  initAppOnReload(){
    
    const token = this.authService.getToken();

    if(token){

      const payload : {exp: number, iat: number, sub: string } = JWT.default(token);
      
      const connectedUserId = payload.sub ;
      let timeout = payload.exp - payload.iat ;

      if(timeout > 0){
        this.setConnectedUser(connectedUserId)
        this.authService.isLogged$.next(true);
        this.authService.setExpirationCounter(timeout);
      }
    }
  }

  setConnectedUser(userId : string){
    this.userService.getUserById(userId).subscribe(
      res => {
        this.authService.user$.next(res.data);
      }
    )
  }
}
