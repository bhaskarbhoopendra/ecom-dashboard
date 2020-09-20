import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditdealComponent } from './editdeal.component';
const routes: Routes = [
    {
        path: '',
        component: EditdealComponent,
        data: {
            title: 'Edit Deal'
        },

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EditdealRoutingModule { }
