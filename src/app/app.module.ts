// Third Party Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire'
import { AngularFireDatabaseModule } from '@angular/fire/database'

// Project-specific Modules
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment'
import { MaterialModule } from './material.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ChooserComponent } from './pages/app-chooser/chooser.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChooserComponent
  ],
  imports: [
    // Angular
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,

    // Material
    MaterialModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
