import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VieworderComponent} from './vieworder.component';

const routes: Routes = [
    {
        path: '',
        component: VieworderComponent,
        data: {
            title: 'View Order'
        },

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VieworderRoutingModule {
}
