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
import { UsuarioComponent } from './usuario/usuario.component';
import { AvisoComponent } from './aviso/aviso.component';
import { GestorComponent } from './gestor/gestor.component';

/*PARA AÑADIR LAS RUTAS DE LA PARTE DE ANGULAR (WEB)
const appRoutes: Routes = [{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'adondequieresir', component: componenteDeDondeQuieresIr },];
*/

/*const ROUTES = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent}
];*/

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    AvisoComponent,
    GestorComponent /*AÑADIR AQUI LOS COMPONENTES*/
  ],
  imports: [BrowserModule,
    FormsModule,
    HttpModule,
    /*RouterModule.forRoot(ROUTES)*/],
  providers: [UsuarioService,
    LogroService,
    GestorService,
    CategoriaService,
    AvisoService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
