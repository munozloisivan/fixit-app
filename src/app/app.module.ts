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
import { CategoriaComponent } from './Componentes/categoria/categoria.component';
import { ContactoComponent } from './Layouts/contacto/contacto.component';
import { FaqComponent } from './Layouts/faq/faq.component';
import { FooterComponent } from './Tools/footer/footer.component';
import {DashboardAdminComponent} from './Layouts/dashboard-admin/dashboard-admin.component';
import { UsuarioPerfilComponent } from './Layouts/usuario-perfil/usuario-perfil.component';
import { PerfilComponent } from './Componentes/perfil/perfil.component';
import {UsuarioAvisosComponent} from './Componentes/usuario-avisos/usuario-avisos.component';
import { UsuarioLogrosComponent } from './Componentes/usuario-logros/usuario-logros.component';
import { LogRegUserComponent } from './Layouts/log-reg-user/log-reg-user.component';
import {AuthGuard} from './Guards/auth.guard';
import { LogRegAdminComponent } from './Layouts/log-reg-admin/log-reg-admin.component';

/*PARA AÑADIR LAS RUTAS DE LA PARTE DE ANGULAR (WEB)
const appRoutes: Routes = [{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'adondequieresir', component: componenteDeDondeQuieresIr },];
*/

const ROUTES = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'howto', component: HowtoComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'admin/dashboard', component: DashboardAdminComponent, canActivate: [AuthGuard]},
  { path: 'aviso-details/:id', component: AvisoDetailsComponent},
  { path: 'aviso-edit/:id', component: AvisoEditComponent, canActivate: [AuthGuard]},
  { path: 'usuarios', component: UsuarioComponent, canActivate: [AuthGuard]},
  { path: 'avisos', component: AvisoComponent},
  { path: 'acceso' , component: LogRegUserComponent},
  { path: 'forgot', component: UsuarioForgotComponent},
  { path: 'acceso/administracion', component: LogRegAdminComponent},
  { path: 'categorias', component: CategoriaComponent, canActivate: [AuthGuard]},
  { path: 'contacto', component: ContactoComponent},
  { path: 'faq', component: FaqComponent},
  { path: 'usuario/perfil', component: UsuarioPerfilComponent, canActivate: [AuthGuard]}
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
    GestorRegistroComponent,
    CategoriaComponent,
    ContactoComponent,
    FaqComponent,
    FooterComponent,
    DashboardAdminComponent,
    UsuarioPerfilComponent,
    PerfilComponent,
    UsuarioAvisosComponent,
    UsuarioLogrosComponent,
    LogRegUserComponent,
    LogRegAdminComponent
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
    AuthGuard,
    {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
