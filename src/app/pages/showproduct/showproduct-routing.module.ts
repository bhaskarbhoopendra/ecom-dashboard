import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowproductComponent } from './showproduct.component';
const routes: Routes = [
    {
        path: '',
        component: ShowproductComponent,
        data: {
            title: 'Show Product'
        },

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ShowproductRoutingModule { }
