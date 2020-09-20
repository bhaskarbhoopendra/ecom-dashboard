import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdddealComponent } from './adddeal.component';
const routes: Routes = [
    {
        path: '',
        component: AdddealComponent,
        data: {
            title: 'Add Deal'
        },

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdddealRoutingModule { }
