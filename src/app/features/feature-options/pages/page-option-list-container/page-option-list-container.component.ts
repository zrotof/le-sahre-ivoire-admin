import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { PageTopHeaderComponent } from 'src/app/shared/components/page-top-header/page-top-header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TopHeader } from 'src/app/core/models/top-header';
import { Router, RouterLink } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { OptionsService } from 'src/app/core/services/options/options.service';
import { OptionAccordionItemComponent } from 'src/app/shared/components/option-accordion-item/option-accordion-item.component';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-page-option-list-container',
  standalone: true,
  imports: [
    NgFor,
    AsyncPipe,
    RouterLink,
    FontAwesomeModule,
    ToastModule,
    ConfirmDialogModule,
    PageTopHeaderComponent,
    OptionAccordionItemComponent
  ],
  templateUrl: './page-option-list-container.component.html',
  styleUrls: ['./page-option-list-container.component.scss'],
  providers: [MessageService, ConfirmationService],
  encapsulation : ViewEncapsulation.None

})
export class PageOptionListContainerComponent implements OnInit, OnDestroy {

  topHeader !: TopHeader ;
  faPlus = faPlus;

  optionList$ !: Observable<any>

  private subscriptions: Subscription[] = [];

  ToastDelay = {
    succeedDelay : 7000,
    cancelDelay : 7000,
    errorDelay : 10000
  };

  constructor( 
    private optionService : OptionsService,
    private messageService : MessageService,
    private confirmationService : ConfirmationService,
    private router : Router
    ){}

  ngOnInit(): void {
    this.initTopHeaderData();
    this.getOptionList();
  }

  initTopHeaderData() : void {
    this.topHeader = {
      title: "Les Options",
      description: "Gestion des options des produits du restaurant"
    }
  }

  getOptionList() : void{
    const queryOption = 'with_possibilities=true&order=label,ASC'
    this.optionList$ = this.optionService.getOptions(queryOption);
  }

  onEditOption(event : number) : void {
    const id = event;
    
    this.subscriptions.push(this.optionService.getOptionById(id).subscribe({
      next : () => {
        this.router.navigate(['/options/modifier/', id])
      },
      error : (error : any) =>{
        //this.messageService.add({severity:'error', detail: 'Erreur, contactez webmaster' });
      }
    }))
  }

  onDeleteOption(event : number) : void {

    this.confirmationService.confirm({
      accept: () => {
        const id = event;

        this.subscriptions.push(
          this.optionService.deleteOption(id).subscribe({
            next : (result : any) =>{
              this.getOptionList();
              this.messageService.add({severity:'success', detail: result.message});
            },
            error : (err)=> {
              this.messageService.add({severity: (err.status === 404 ? 'warn' : 'error'), detail: err.error.message , life: this.ToastDelay.errorDelay});
            },
          })
        ) 
      },
      reject: (type: any) => {
        switch(type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({severity:'info', detail:'Suppression annulée', life: this.ToastDelay.cancelDelay});
          break;
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
