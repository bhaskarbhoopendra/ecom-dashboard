import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditcouponComponent } from './editcoupon.component';
const routes: Routes = [
    {
        path: '',
        component: EditcouponComponent,
        data: {
            title: 'Edit Coupon'
        },

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EditcouponRoutingModule { }
