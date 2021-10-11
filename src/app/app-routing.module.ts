import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeneratorComponent } from './generator/generator.component';
import { PaymentsComponent } from './payments/payments.component';

const routes: Routes = [
    { path: 'generator', component: GeneratorComponent },
    { path: 'payments', component: PaymentsComponent },
    { path: '', redirectTo: '/generator', pathMatch: 'prefix' } // TODO match full and add ** with 404 page
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
