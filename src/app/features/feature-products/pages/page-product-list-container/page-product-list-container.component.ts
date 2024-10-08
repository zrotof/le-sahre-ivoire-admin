import { Component, OnInit } from '@angular/core';
import { PageTopHeaderComponent } from 'src/app/shared/components/page-top-header/page-top-header.component';
import { TopHeader } from 'src/app/core/models/top-header';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ProductType } from 'src/app/core/enums/product-type.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-page-product-list-container',
  standalone: true,
  imports: [
    MenuModule,
    FontAwesomeModule,
    PageTopHeaderComponent,
    ReactiveFormsModule
  ],
  templateUrl: './page-product-list-container.component.html',
  styleUrls: ['./page-product-list-container.component.scss']
})
export class PageProductListContainerComponent implements OnInit {

  topHeader !: TopHeader ;
  faPlus = faPlus;
  items !: MenuItem[];
  
  ngOnInit(): void {
    this.initTopHeaderData();
    this.initMenuOnAddProductTypeCoices();
  }

  initTopHeaderData() : void {
    this.topHeader = {
      title: "Les Produits",
      description: "Gestion des produits du restaurant"
    }
  }

  initMenuOnAddProductTypeCoices() : void {
    this.items = [
      {
        label: 'Accompagnement',
        routerLink: "/produits/creer/"+ProductType.Side.toLowerCase()
        //icon: 'pi pi-fw pi-plus',
      },
      {
        label: 'Boisson',
        routerLink : "/produits/creer/"+ProductType.Drink.toLowerCase()
        //icon: 'pi pi-fw pi-trash'
      },
      {
        label: 'Déssert',
        routerLink : "/produits/creer/"+ProductType.Dessert.toLowerCase()
        //icon: 'pi pi-fw pi-plus',
      },
      {
          label: 'Plat',
          routerLink: "/produits/creer/"+ProductType.Dish.toLowerCase()
          //icon: 'pi pi-fw pi-plus',
      },
      {
        label: 'Salade',
        //icon: 'pi pi-fw pi-plus',
      }
    ];
  }
}
