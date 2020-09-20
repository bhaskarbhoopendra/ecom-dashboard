import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditcategoryComponent } from './editcategory.component';
const routes: Routes = [
    {
        path: '',
        component: EditcategoryComponent,
        data: {
            title: 'Edit Category'
        },

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EditcategoryRoutingModule { }
