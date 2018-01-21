import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { HashLocationStrategy, LocationStrategy} from '@angular/common';

import { HttpModule} from '@angular/http';
import { FormsModule} from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
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
import { UsuarioLoginComponent } from './Componentes/Acceso/usuario-login/usuario-login.component';
import { GestorLoginComponent } from './Componentes/Acceso/gestor-login/gestor-login.component';
import { HowtoComponent } from './Layouts/howto/howto.component';
import { UsuarioRegistroComponent } from './Componentes/Acceso/usuario-registro/usuario-registro.component';
import { UsuarioForgotComponent } from './Componentes/usuario-forgot/usuario-forgot.component';
import { DashboardComponent } from './Layouts/dashboard/dashboard.component';
import { NavbarDashboardComponent } from './Tools/navbar-dashboard/navbar-dashboard.component';
import { GestorRegistroComponent } from './Componentes/Acceso/gestor-registro/gestor-registro.component';
import { AvisoGestionComponent } from './Componentes/Administracion/aviso-gestion/aviso-gestion.component';
import { AvisoEditComponent } from './Componentes/Administracion/aviso-edit/aviso-edit.component';
import { AvisoDetailsComponent } from './Componentes/Administracion/aviso-details/aviso-details.component';
import { CategoriaComponent } from './Componentes/Administracion/categoria/categoria.component';
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
import { NavbarUsuarioComponent } from './Tools/navbar-usuario/navbar-usuario.component';
import { LogRegAdminComponent } from './Layouts/log-reg-admin/log-reg-admin.component';
import {AuthuserGuard} from './Guards/authuser.guard';
import { AdminMapComponent } from './Componentes/Administracion/admin-map/admin-map.component';
import { DatePipe } from '@angular/common';
import { UsuarioGestionComponent } from './Componentes/Administracion/usuario-gestion/usuario-gestion.component';
import { CategoriaEditComponent } from './Componentes/Administracion/categoria-edit/categoria-edit.component';
import {DataTableModule} from 'angular2-datatable';
import { EstadisticasComponent } from './Componentes/Administracion/estadisticas/estadisticas.component';
import { UsuarioEditComponent } from './Componentes/Administracion/usuario-edit/usuario-edit.component';
import { UsuarioDetailsComponent } from './Componentes/Administracion/usuario-details/usuario-details.component';

/*PARA AÑADIR LAS RUTAS DE LA PARTE DE ANGULAR (WEB)
const appRoutes: Routes = [{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'adondequieresir', component: componenteDeDondeQuieresIr },];
*/


const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'howto', component: HowtoComponent},
  { path: 'admin-avisos', component: DashboardAdminComponent, canActivate: [AuthGuard]},
  { path: 'admin-usuarios', component: UsuarioGestionComponent, canActivate: [AuthGuard]},
  { path: 'admin-map', component: AdminMapComponent, canActivate: [AuthGuard]},
  { path: 'admin-stats', component: EstadisticasComponent, canActivate: [AuthGuard]},
  { path: 'aviso-details/:id', component: AvisoDetailsComponent, canActivate: [AuthGuard]},
  { path: 'usuario-details/:id', component: UsuarioDetailsComponent, canActivate: [AuthGuard]},
  { path: 'usuario-edit/:id', component: UsuarioEditComponent, canActivate: [AuthGuard]},
  { path: 'aviso-edit/:id', component: AvisoEditComponent, canActivate: [AuthGuard]},
  { path: 'usuarios', component: UsuarioComponent, canActivate: [AuthGuard]},
  { path: 'avisos', component: AvisoComponent},
  { path: 'acceso' , component: LogRegUserComponent},
  { path: 'forgot', component: UsuarioForgotComponent},
  { path: 'administracion', component: LogRegAdminComponent},
  { path: 'categorias', component: CategoriaComponent, canActivate: [AuthGuard]},
  { path: 'categoria-edit/:id', component: CategoriaEditComponent, canActivate: [AuthGuard]},
  { path: 'contacto', component: ContactoComponent},
  { path: 'faq', component: FaqComponent},
  { path: 'usuario/perfil', component: UsuarioPerfilComponent, canActivate: [AuthuserGuard]}
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
    NavbarUsuarioComponent,
    LogRegAdminComponent,
    AdminMapComponent,
    UsuarioGestionComponent,
    CategoriaEditComponent,
    EstadisticasComponent,
    UsuarioEditComponent,
    UsuarioDetailsComponent
  ],
  imports: [BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBkEnyDP9tEWPI97FdYK82xyx2VDGQvt-A'
    }),
    AgmJsMarkerClustererModule,
    RouterModule.forRoot(appRoutes)],
  providers: [UsuarioService,
    LogroService,
    GestorService,
    CategoriaService,
    AvisoService,
    AuthGuard,
    AuthuserGuard,
    DatePipe,
    {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
