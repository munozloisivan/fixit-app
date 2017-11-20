import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HashLocationStrategy, LocationStrategy} from '@angular/common';

import { HttpModule} from '@angular/http';
import { FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

/* SERVICES */
import { UsuarioService } from './Services/usuario.service';
import { LogroService } from './Services/logro.service';
import { GestorService } from './Services/gestor.service';
import { CategoriaService } from './Services/categoria.service';
import { AvisoService } from './Services/aviso.service';

import { AppComponent } from './app.component';
import { UsuarioComponent } from './Componentes/usuario/usuario.component';
import { AvisoComponent } from './Componentes/aviso/aviso.component';
import { GestorComponent } from './Componentes/gestor/gestor.component';
import { HomeComponent } from './Layouts/home/home.component';
import { NavbarHomeComponent } from './Tools/navbar-home/navbar-home.component';
import { UsuarioLoginComponent } from './Componentes/usuario-login/usuario-login.component';
import { GestorLoginComponent } from './Componentes/gestor-login/gestor-login.component';
import { HowtoComponent } from './Layouts/howto/howto.component';
import { UsuarioRegistroComponent } from './Componentes/usuario-registro/usuario-registro.component';
import { UsuarioForgotComponent } from './Componentes/usuario-forgot/usuario-forgot.component';
import { DashboardComponent } from './Layouts/dashboard/dashboard.component';
import { NavbarDashboardComponent } from './Tools/navbar-dashboard/navbar-dashboard.component';
import { GestorRegistroComponent } from './Componentes/gestor-registro/gestor-registro.component';
import { AvisoGestionComponent } from './Componentes/aviso-gestion/aviso-gestion.component';
import { AvisoEditComponent } from './Componentes/aviso-edit/aviso-edit.component';
import { AvisoDetailsComponent } from './Componentes/aviso-details/aviso-details.component';

/*PARA AÑADIR LAS RUTAS DE LA PARTE DE ANGULAR (WEB)
const appRoutes: Routes = [{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'adondequieresir', component: componenteDeDondeQuieresIr },];
*/

const ROUTES = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'howto', component: HowtoComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'aviso-details/:id', component: AvisoDetailsComponent},
  { path: 'aviso-edit/:id', component: AvisoEditComponent},
  { path: 'usuarios', component: UsuarioComponent},
  { path: 'avisos', component: AvisoComponent},
  { path: 'login', component: UsuarioLoginComponent},
  { path: 'registro', component: UsuarioRegistroComponent},
  { path: 'forgot', component: UsuarioForgotComponent},
  { path: 'login/administracion', component: GestorLoginComponent},
  { path: 'registro/administracion', component: GestorRegistroComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    AvisoComponent,
    GestorComponent,
    HomeComponent,
    NavbarHomeComponent,
    UsuarioLoginComponent,
    GestorLoginComponent,
    HowtoComponent,
    UsuarioRegistroComponent,
    UsuarioForgotComponent,
    DashboardComponent,
    NavbarDashboardComponent,
    AvisoEditComponent,
    AvisoDetailsComponent,
    AvisoGestionComponent,
    GestorRegistroComponent
  ],
  imports: [BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)],
  providers: [UsuarioService,
    LogroService,
    GestorService,
    CategoriaService,
    AvisoService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
