import { Component, OnInit } from '@angular/core';
import { CommonModule, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TopHeader } from 'src/app/core/models/top-header';
import { PageTopHeaderComponent } from 'src/app/shared/components/page-top-header/page-top-header.component';
import { DropdownModule } from 'primeng/dropdown';
import { ProductType } from 'src/app/core/enums/product-type.enum';
import { DishFormComponent } from './components/dish-form/dish-form.component';
import { DrinkFormComponent } from './components/drink-form/drink-form.component';
import { DessertFormComponent } from './components/dessert-form/dessert-form.component';


@Component({
  selector: 'app-page-product-add-edit-container',
  standalone: true,
  imports: [
    DropdownModule,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    PageTopHeaderComponent,
    DishFormComponent,
    DrinkFormComponent,
    DessertFormComponent
  ],
  templateUrl: './page-product-add-edit-container.component.html',
  styleUrls: ['./page-product-add-edit-container.component.scss']
})
export class PageProductAddEditContainerComponent implements OnInit {

  productType !: string | null | undefined;
  topHeader !: TopHeader ;

  constructor( private activatedRoute: ActivatedRoute, private router : Router ){}

  ngOnInit(): void {
    this.getProductTypeInRoute();
    this.initTopHeaderData();
    console.log("test")
  }

  /**
   * We get the param from url
   * If the param don't match to knowed product type
   * ----> we redirect to not found page with the context 
   * ----> is so, we get the param and use it 
   */
  getProductTypeInRoute(): void{
    const currentProductType = this.activatedRoute.snapshot.paramMap.get('type')?.toUpperCase();

    if(this.isProducTypeValid(currentProductType)){
      this.productType = currentProductType;
      return ;
    }

    this.router.navigateByUrl("page-introuvable");
  }

  initTopHeaderData() : void {
    this.topHeader = {
      title: "Ajouter : "+this.productType?.toLocaleUpperCase() ,
      description: "création d'un nouveau produit de type "+this.productType?.toLowerCase()
    }
  }

  isProducTypeValid(value: string | undefined): boolean {
    return Object.values(ProductType).includes(value as ProductType);
  }

}
