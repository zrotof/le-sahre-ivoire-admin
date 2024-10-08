import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';

import { OptionWithPossibilities } from 'src/app/core/models/option-with-possibilities';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-option-accordion-item',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgFor,
    OverlayPanelModule
  ],
  templateUrl: './option-accordion-item.component.html',
  styleUrls: ['./option-accordion-item.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class OptionAccordionItemComponent {

  @Input() optionWithPossibilities !: OptionWithPossibilities;
  @Output() editOptionEvent = new EventEmitter<number>();
  @Output() deleteOptionEvent = new EventEmitter<number>();      

  isPossibilitiesShow = false;

  onAccordionHeaderClick() : void {
    this.isPossibilitiesShow = !this.isPossibilitiesShow;
  }
  
  editOptionEventTrigger(optionId : number){
    this.editOptionEvent.emit(optionId);
  }

  deleteOptionEventTrigger(optionId: number){
    this.deleteOptionEvent.emit(optionId);
  }
}
