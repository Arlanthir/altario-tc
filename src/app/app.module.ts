import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneratorComponent } from './generator/generator.component';
import { PaymentsComponent } from './payments/payments.component';
import { CodeComponent } from './code/code.component';

/**
 * The main Angular app Module.
 *
 * Declares all the app's components and prepares the app
 * to run in a browser with the routes imported from {@link AppRoutingModule}.
 */
@NgModule({
    declarations: [
        AppComponent,
        GeneratorComponent,
        PaymentsComponent,
        CodeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
