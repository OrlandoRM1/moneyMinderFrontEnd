import { Routes } from '@angular/router';
import { LoguinComponent } from './loguin/loguin.component';
import { GastosComponent } from './gastos/gastos.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirigir a login por defecto
  { path: 'login', component: LoguinComponent },
  { path: 'gastos', component: GastosComponent }
];
