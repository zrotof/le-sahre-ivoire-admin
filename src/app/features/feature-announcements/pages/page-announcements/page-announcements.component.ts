import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTopHeaderComponent } from 'src/app/shared/components/page-top-header/page-top-header.component';
import { TopHeader } from 'src/app/core/models/top-header';
import { AnnouncementsListComponent } from './components/announcements-list/announcements-list.component';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Announce } from 'src/app/core/models/announce';
import { AnnouncesService } from 'src/app/core/services/announces/announces.service';

@Component({
  selector: 'app-page-announcements',
  standalone: true,
  imports: [
    AsyncPipe,
    PageTopHeaderComponent,
    AnnouncementsListComponent
  ],
  templateUrl: './page-announcements.component.html',
  styleUrls: ['./page-announcements.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PageAnnouncementsComponent implements OnInit {
  topHeader !: TopHeader ;
  announces$ !: Observable<Announce[]>;

  constructor(
    private announceService : AnnouncesService
  ) {}

  ngOnInit(): void {
      this.initTopHeaderData();
      this.getAnnouncesList();
  }

  initTopHeaderData() : void {
    this.topHeader = {
      title: "Annonces",
      description: "Gestion des annonces affichées sur le site web publique"
    }
  }

  getAnnouncesList() : void {
    this.announces$ = this.announceService.getAnnounces();
  }
}
