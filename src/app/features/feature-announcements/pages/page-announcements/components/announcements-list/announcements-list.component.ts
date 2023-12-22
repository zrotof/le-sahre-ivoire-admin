import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Announce } from 'src/app/core/models/announce';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-announcements-list',
  standalone: true,
  imports: [
    NgIf,
    NgStyle,
    NgClass,
    TableModule,
    InputTextModule,
    InputSwitchModule,
    OverlayPanelModule,
    ReactiveFormsModule
  ],
  templateUrl: './announcements-list.component.html',
  styleUrls: ['./announcements-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnnouncementsListComponent implements OnInit {

  @Input() announces : Announce[] = [];
  @Output() saveEvent = new EventEmitter<any>();

  announceForm !: FormGroup;

  indexOfRowToEdit: number = -1;

  constructor( private fb: FormBuilder){}

  ngOnInit(): void {
      this.initForm();
  }

  initForm(): void {
    this.announceForm =this.fb.group({
      text: ['', Validators.required],
      isActive: [false]
    })
  }

  editRow(id : number, rowIndex : number): void {
    this.indexOfRowToEdit = rowIndex;

    this.announceForm.get('text')?.setValue(this.announces[rowIndex].text);
    this.announceForm.get('isActive')?.setValue(this.announces[rowIndex].isActive);
    
  }
  
  saveChanges(rowData : number, rowIndex: number):void {
    this.indexOfRowToEdit = -1;

    if(
      this.announceForm.get('text')?.value === this.announces[rowIndex].text
      &&
      this.announceForm.get('isActive')?.value === this.announces[rowIndex].isActive
    ){
      return;
    }

    this.announces[rowIndex].text = this.announceForm.get('text')?.value ;
    this.announces[rowIndex].isActive = this.announceForm.get('isActive')?.value;

    this.saveEvent.emit(rowData);
  }
  
  cancelEdit(): void{
    this.indexOfRowToEdit = -1;
  }

  deleteRow(id: number, rowIndex : number){

  }
}
