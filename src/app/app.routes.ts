import { Routes } from '@angular/router';
import { ProcessSate } from './core/enums/process-state.enum';

export const routes: Routes = [
    
    {
        path:"",
        redirectTo: "tableau-de-bord",
        pathMatch: "full"    
    },
    {
        path: "tableau-de-bord",
        loadComponent: () => import('./features/feature-dashboard/pages/page-dashboard/page-dashboard.component').then(m => m.PageDashboardComponent)
    },
    {
        path:"annonces",
        loadComponent: () => import('./features/feature-announcements/pages/page-announcements/page-announcements.component').then(m => m.PageAnnouncementsComponent)
    },
    {
        path:"options",
        children : [
            {
                path:"",
                redirectTo: "liste-options",
                pathMatch: "full"
            },
            {
                path: "liste-options",
                loadComponent : () => import('./features/feature-options/pages/page-option-list-container/page-option-list-container.component').then(m => m.PageOptionListContainerComponent),
                data:{
                    processState : ProcessSate.Read
                }
            },
            {
                path: "creer",
                loadComponent : () => import('./features/feature-options/pages/page-option-add-edit-container/page-option-add-edit-container.component').then( m => m.PageOptionAddEditContainerComponent),
                data:{
                    processState : ProcessSate.Create
                }
            },
            {
                path: "modifier/:id",
                loadComponent : () => import('./features/feature-options/pages/page-option-add-edit-container/page-option-add-edit-container.component').then( m => m.PageOptionAddEditContainerComponent),
                data:{
                    processState : ProcessSate.Edit
                }
            }
        ]
    },
    {
        path:"produits",
        children : [
            {
                path:"",
                redirectTo: "liste-produits",
                pathMatch: "full"
            },
            {
                path: "liste-produits",
                loadComponent : () => import('./features/feature-products/pages/page-product-list-container/page-product-list-container.component').then(m => m.PageProductListContainerComponent)
            },
            {
                path: "creer",
                children : [
                    {
                        path:"",
                        redirectTo: "plat",
                        pathMatch: "full"
                    },
                    {
                        path: ":type",
                        loadComponent : () => import('./features/feature-products/pages/page-product-add-edit-container/page-product-add-edit-container.component').then( m => m.PageProductAddEditContainerComponent)
                    }
                ]
            }
        ]
    },
    {
        path:'page-introuvable',
        loadComponent : () => import('./features/feature-not-found/pages/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
    },
    {
        path:'**',
        redirectTo : 'page-introuvable',
        pathMatch:"full"
    }
];