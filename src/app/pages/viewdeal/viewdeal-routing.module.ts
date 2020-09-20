import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewdealComponent } from './viewdeal.component';
const routes: Routes = [
    {
        path: '',
        component: ViewdealComponent,
        data: {
            title: 'View Deal'
        },

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ViewdealRoutingModule { }
