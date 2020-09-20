import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewcategoryComponent } from './viewcategory.component';
const routes: Routes = [
    {
        path: '',
        component: ViewcategoryComponent,
        data: {
            title: 'View Category'
        },

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ViewcategoryRoutingModule { }
