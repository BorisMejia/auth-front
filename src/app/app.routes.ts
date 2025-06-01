import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import ('./shared/components/layout/layout.component'),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import ('./features/dashboard/dashboard.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'profile',
                loadComponent: () => import ('./features/profile/profile.component'),
                canActivate: [AuthGuard]
            },
            {
                path: 'tables',
                loadComponent: () => import ('./features/tables/tables.component'),
                canActivate: [AuthGuard]
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            
            },
        ]
        
    },
    {
        path: 'login',
        loadComponent: () => import ('./features/components/login/login.component'),
        canActivate: [AuthenticatedGuard]
    },
    {
        path: 'register',
        loadComponent: () => import ('./features/components/register/register.component')
    },
    {
        path: '**',
        loadComponent: () => import ('./features/components/notfound/notfound.component')
    }
];
