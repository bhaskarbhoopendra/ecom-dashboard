import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditlocationComponent } from './editlocation.component';
const routes: Routes = [
    {
        path: '',
        component: EditlocationComponent,
        data: {
            title: 'Edit Location'
        },

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EditlocationRoutingModule { }
