import { Component, Input } from '@angular/core';
import { TopHeader } from 'src/app/core/models/top-header';

@Component({
  selector: 'app-page-top-header',
  standalone: true,
  imports: [
  ],
  templateUrl: './page-top-header.component.html',
  styleUrls: ['./page-top-header.component.scss']
})
export class PageTopHeaderComponent {

  @Input() topHeader !: TopHeader
}
