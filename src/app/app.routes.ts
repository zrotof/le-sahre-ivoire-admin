import { Routes } from '@angular/router';

export const routes: Routes = [
    
    {
        path:"annonces",
        loadComponent: () => import('./features/feature-announcements/pages/page-announcements/page-announcements.component').then(m => m.PageAnnouncementsComponent)
    },
    {
        path:"",
        loadComponent: () => import('./features/feature-dashboard/pages/page-dashboard/page-dashboard.component').then(m => m.PageDashboardComponent)
    }
];