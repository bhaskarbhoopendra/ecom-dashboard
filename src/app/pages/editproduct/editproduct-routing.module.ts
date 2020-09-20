import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditproductComponent } from './editproduct.component';
const routes: Routes = [
    {
        path: '',
        component: EditproductComponent,
        data: {
            title: 'Edit Product'
        },

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EditproductRoutingModule { }
