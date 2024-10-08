import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopHeader } from 'src/app/core/models/top-header';
import { PageTopHeaderComponent } from 'src/app/shared/components/page-top-header/page-top-header.component';
import { OptionAccordionItemComponent } from 'src/app/shared/components/option-accordion-item/option-accordion-item.component';

 import { ProcessSate } from "../../../../core/enums/process-state.enum";
import { ActivatedRoute } from '@angular/router';
import { OptionAddEditFormComponent } from './components/option-add-edit-form/option-add-edit-form.component';

@Component({
  selector: 'app-page-option-add-edit-container',
  standalone: true,
  imports: [
    PageTopHeaderComponent,
    OptionAddEditFormComponent,
    OptionAccordionItemComponent
  ],
  templateUrl: './page-option-add-edit-container.component.html',
  styleUrls: ['./page-option-add-edit-container.component.scss']
})
export class PageOptionAddEditContainerComponent implements OnInit {

  @Input() processState !: ProcessSate;
  
  topHeader !: TopHeader;

  //processState !: ProcessSate;

  ngOnInit(): void {
    this.getCurrentProcessState();
    this.initTopHeaderData();
  }

  initTopHeaderData() : void {
    if(this.processState === ProcessSate.Create){
      this.topHeader = {
        title: "Ajouter Une Option",
        description: "Création d'une nouvelle option de produit "
      }
    }
    else{
      this.topHeader = {
        title: "Modifier Une Option",
        description: "édition d'une option de produit "
      }    
    }
  }

  getProcessState(): void {
    this.processState = ProcessSate.Create
  }

  getCurrentProcessState(){
    console.log(this.processState)
    //this.processState = this.activatedRoute.snapshot.data['processState']
    //console.log(this.processState)
  }
}
