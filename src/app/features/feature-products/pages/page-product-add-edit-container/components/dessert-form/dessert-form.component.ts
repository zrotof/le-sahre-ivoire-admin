import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChipsModule } from 'primeng/chips';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-dessert-form',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    InputTextModule,
    InputTextareaModule,
    ChipsModule,
    ReactiveFormsModule,
    OverlayPanelModule,
    RadioButtonModule,
    InputNumberModule,
    MultiSelectModule
  ],
  templateUrl: './dessert-form.component.html',
  styleUrls: ['./dessert-form.component.scss'],
  encapsulation : ViewEncapsulation.None
})

export class DessertFormComponent implements OnInit {

  dessertForm !: FormGroup;

  noBackgroundedImage !: string | ArrayBuffer | null;
  backgroundedImage !: string | ArrayBuffer | null;


  isNoBackgroundedImageEdited = false;
  isBackgroundImageEdited = false;

  isSaveButtonClicked = false;
  isEditButtonClicked = false;

  attributeList : any;
  currentAttribute : any;
  currentOptions : any;

  constructor( private fb : FormBuilder ){}

  ngOnInit(): void {
      this.initDessertForm();
      this.getAttributesList();
  }

  initDessertForm() : void {
    this.dessertForm = this.fb.group({
      name: ["", Validators.required],
      price : ["", Validators.required],
      description: ["", Validators.required],
      ingredients : ["", Validators.required],
      noBackgroundedImage: ["", Validators.required],
      backgroundedImage: ["", Validators.required],
      attributes : this.fb.array([])
    })
  }

  get formControls(){
    return this.dessertForm.controls
  }

  get attributes(): FormArray {
    return this.dessertForm.get('attributes') as FormArray
  }

  showImagePreview(event: any){

    const file = event.target.files[0];
  
    if(file){
      const fileReader = new FileReader();

      if(event.target.id === "image-no-background"){
        this.isNoBackgroundedImageEdited = true;
        this.dessertForm.patchValue({noBackgroundedImage: file});
        this.formControls['noBackgroundedImage'].updateValueAndValidity();
    
        fileReader.onload = () =>{
          this.noBackgroundedImage = fileReader.result;
        }
      }
      else{
        this.isBackgroundImageEdited = true;
        this.dessertForm.patchValue({backgroundedImage: file});
        this.formControls['backgroundedImage'].updateValueAndValidity();
    
        fileReader.onload = () =>{
          this.backgroundedImage = fileReader.result;
        }
      }
      
      fileReader.readAsDataURL(file);
  
    }
  }

  getAttributesList() : void {
    this.attributeList = [
      {
        id: 1,
        name: "Accompagnement"
      },
      {
        id: 2,
        name: "Sauce"
      },
      {
        id: 3,
        name: "Nappage"
      },
      {
        id: 4,
        name: "Taille"
      },
      {
        id: 5,
        name: "Couleur"
      },
      {
        id: 6,
        name: "Parfum"
      },
      {
        id: 7,
        name: "Contenant"
      }
    ]
  }

  onAddAttribute( attribute : any) : void {
    this.attributes.push(this.createAttributesFormGroup(attribute));
  }

  createAttributesFormGroup( currentAttribute : any) {
    return this.fb.group({
      attributeChoosed: [currentAttribute , Validators.required],
      isMandatory: ['', Validators.required],
      choicesNumber : [0, Validators.required],
      options : [[],Validators.required]
    })
  }

  removeAttributes(index: number): void {
    this.attributes.removeAt(index);
  }

  getOptionsRelatedToAttributes() : any {

    return {
      accompagnement : [
          {
            id: 1,
            name: "Plantain"
          },
        {
            id: 2,
            name: "Riz"
        }
      ]
      ,
      sauce :[
          {
            id: 1,
            name: "Piment"
          },
          {
            id: 2,
            name: "Mayo"
          }
        ]
    }
  }
}
