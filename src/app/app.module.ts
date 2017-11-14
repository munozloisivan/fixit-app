import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { UsuarioService } from './usuario.service';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
