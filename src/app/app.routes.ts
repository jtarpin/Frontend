import { Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { LaunchpadComponent } from './pages/launchpad/launchpad.component';
import { GestionDeOrdenesComponent } from './pages/gestion-de-ordenes/gestion-de-ordenes.component';

export const routes: Routes = [

    // {
    //     path: '',
    //     component: AppComponent
    // },
    {
        path: 'registro',
        component: RegistroComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LaunchpadComponent
    },
    {
        path: 'gestion-de-ordenes',
        component: GestionDeOrdenesComponent
    }

];
