import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealsComponent } from './deals.component';
const routes: Routes = [
    {
        path: '',
        component: DealsComponent,
        data: {
            title: 'Deals'
        },

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DealsRoutingModule { }
