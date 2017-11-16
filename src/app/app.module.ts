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

/*PARA AÑADIR LAS RUTAS DE LA PARTE DE ANGULAR (WEB)
const appRoutes: Routes = [{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'adondequieresir', component: componenteDeDondeQuieresIr },];
*/

const ROUTES = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  {path: 'howto', component: HowtoComponent},
  { path: 'usuarios', component: UsuarioComponent},
  { path: 'avisos', component: AvisoComponent},
  { path: 'login', component: UsuarioLoginComponent},
  { path: 'registro', component: UsuarioRegistroComponent}
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
    UsuarioRegistroComponent
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
