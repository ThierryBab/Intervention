import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenueComponent } from './bienvenue/bienvenue.component';
import { ProblemeComponent } from './probleme/probleme.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { ProblemeData } from './probleme/typeProbleme-data';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule({
  declarations: [
    AppComponent,
    BienvenueComponent,
    ProblemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule .forRoot(ProblemeData, { delay: 1000 }),
    RouterModule.forRoot([
      {path:'acceuil', component:AcceuilComponent},
      {path:'', redirectTo:'acceuil', pathMatch:'full'},
      {path:'**', redirectTo:'acceuil', pathMatch:'full'},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
