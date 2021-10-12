import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeneratorComponent } from './generator/generator.component';
import { PaymentsComponent } from './payments/payments.component';

/**
 * The collection of routes in the application.
 *
 * `/generator` renders {@link GeneratorComponent}.
 * `/payments` renders {@link PaymentsComponent}.
 *
 * All other routes redirect to the generator.
 */
const routes: Routes = [
    { path: 'generator', component: GeneratorComponent },
    { path: 'payments', component: PaymentsComponent },
    { path: '', redirectTo: '/generator', pathMatch: 'prefix' } // TODO match full and add ** with 404 page
];

/**
 * The routing module used to collect and offer the routes to the main {@link AppModule}.
 */
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
