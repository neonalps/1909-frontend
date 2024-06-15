import { Routes } from '@angular/router';
import { DashboardComponent } from '@src/app/pages/dashboard/dashboard.component';

export const routes: Routes = [
    { 
        path: 'dashboard',
        component: DashboardComponent,
    },
    { 
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
    },
];
