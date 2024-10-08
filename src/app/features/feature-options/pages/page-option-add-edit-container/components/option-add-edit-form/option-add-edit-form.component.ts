import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Location, NgFor, NgIf } from '@angular/common';

import { ProcessSate } from 'src/app/core/enums/process-state.enum';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OptionsService } from 'src/app/core/services/options/options.service';
import { MessageService } from 'primeng/api';
import { Subscription, lastValueFrom, take, timeInterval, timeout, timer } from 'rxjs';

import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router } from '@angular/router';

import { areTwoArraysEqual } from '../../../../../../core/utils/are-two-arrays-equals.utils';

@Component({
  selector: 'app-option-add-edit-form',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    ToastModule
  ],
  templateUrl: './option-add-edit-form.component.html',
  styleUrls: ['./option-add-edit-form.component.scss'],
  providers: [ MessageService ]

})
export class OptionAddEditFormComponent implements OnChanges {

  @Input() processState !: ProcessSate;

  optionsForm !: FormGroup;
  isFormSubmitted = false;
  mininumNumberOfOption = 2;

  optionWithPossibilities : any;
  
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private optionService : OptionsService,
    private messageService : MessageService,
    private activatedROute : ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit() {
    this.initOptionsForm();
  }

  initOptionsForm() {
    this.optionsForm = this.fb.group(
      {
        option : ["", Validators.required],
        optionPossibilities : this.fb.array([])
      }
    );

    for (let i = 0; i < this.mininumNumberOfOption; i++) {
      this.onAddOption();
    }
  }
/*
  checkEditMode(){
    this.activatedRoute.params.subscribe(
       (params : any)=>{
        if(params.id){
          this.isEditMode = true;

          this.artcileService.getRubricById(params.id).subscribe(
            (result : any) => {
              if(result.status === "success"){
                //initialising first data when edit in order to know if value have any changes
                this.initialReplayDataWhenEdit = result.data;
                this.rubricForm.controls['name'].setValue(this.initialReplayDataWhenEdit.name);
                this.rubricForm.controls['description'].setValue(this.initialReplayDataWhenEdit.description);
                this.rubricForm.controls['isActive'].setValue(this.initialReplayDataWhenEdit.isActive);
              }
            },
            () =>{
              this.messageService.add({
                severity:'warn', 
                detail: 'Rubrique inexistant, contactez le webmaster'
              });
              return;
            }
          )
        }
      },
      () =>{
        this.messageService.add({severity:'warn', detail: 'Rubrique inconnue' });
        return;
      }
    )
  }

  */

  get formControls(){
    return this.optionsForm.controls
  }

  get optionPossibilities(): FormArray {
    return this.optionsForm.get('optionPossibilities') as FormArray
  }

  onAddOption() : void {
    this.optionPossibilities.push(this.createOptionPossibilityFormGroup());
  }

  createOptionPossibilityFormGroup(){
    return this.fb.group({
      optionPossibility: ["", [Validators.required]]
    })
  }

  removeOtion(index: number): void {
    if(this.optionPossibilities.length > 2){
      this.optionPossibilities.removeAt(index);
      return ;
    }
  }

  onSaveForm() : void {
    this.isFormSubmitted = true;

    if(this.optionsForm.invalid){
      return ;
    }

    if(this.processState === ProcessSate.Create){
      this.createOtion();
    }
    else{
      this.editOption();
    }
  }

  createOtion() : void {
    this.optionService.createOption(this.optionsForm.value).subscribe({
      next : result => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: result.message, life: 5000 });
        lastValueFrom(timer(2000))
        .then(
          () =>{
            this.router.navigateByUrl("/options/liste-options")
          }
        );
      },
      error : err => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: err.error.message, life: 10000 });
      }
    })
  }

  editOption() : void {
    let newObject = {};
    let areThereChanges = false;

    if( this.optionWithPossibilities.label != this.formControls['option'].value ){
      areThereChanges = true;

      newObject = { 
        ...newObject, 
        label : this.formControls['option'].value 
      }
    }

    const array1 = this.optionWithPossibilities.possibilities.map((item : any) => item.label);
    const array2 = this.optionsForm.value.optionPossibilities.map((item : any) => item.optionPossibility);

    const areArraysChanges = areTwoArraysEqual(array1, array2);

    if(!areArraysChanges){
      areThereChanges = true;

      newObject = { 
        ...newObject, 
        optionPossibilities : this.formControls['optionPossibilities'].value 
      }
    }

    if(areThereChanges){
      this.optionService.editOption(this.optionWithPossibilities.id, newObject).pipe(take(1)).subscribe({
        next : (result : any) => {
          console.log(result);
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: result.message, life: 7000 });
          lastValueFrom(timer(3000))
          .then(
            () =>{
              this.router.navigateByUrl("/options/liste-options")
            }
          )
        }
      })
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Attention', detail: "Aucune modification n'a été effectuée, l'enregistrement n'est donc pas nécessaire !", life: 7000 });
    }
  }

  onCancel() : void {
    this.location.back();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['processState'].currentValue === ProcessSate.Edit){
      //Load data and set form with values
      this.loadDataAndSetForm();
    }
  }

  loadDataAndSetForm() : void {
    const id = this.activatedROute.snapshot.params['id'];
    
    this.optionService.getOptionById(id).subscribe({
      next : (result : any) =>{
        this.optionWithPossibilities = result.data;

        this.optionsForm.controls['option'].setValue(this.optionWithPossibilities.label);
        //We clear existing value in form arrays
        this.optionPossibilities.clear();

        this.optionWithPossibilities.possibilities.forEach(( possibility : any ) => {
          console.log(possibility);
          this.optionPossibilities.push(
            this.fb.group({
              optionPossibility: [possibility.label, Validators.required]
            }));
        });
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
