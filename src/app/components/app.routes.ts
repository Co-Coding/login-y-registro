import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthguardGuard } from '../guards/authguard.guard';

const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [ AuthguardGuard ] },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
     { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
