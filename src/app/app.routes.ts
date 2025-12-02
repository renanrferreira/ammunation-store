import { Routes } from '@angular/router';
import { Home } from './componentes/home/home';
import { Navbar } from './componentes/navbar/navbar';

export const routes: Routes = [
    {
        path:'',component: Home
    },
    {
        path:'',component:Navbar
    }
];
