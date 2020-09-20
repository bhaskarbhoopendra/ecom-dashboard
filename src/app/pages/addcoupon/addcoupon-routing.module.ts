import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddcouponComponent } from './addcoupon.component';
const routes: Routes = [
    {
        path: '',
        component: AddcouponComponent,
        data: {
            title: 'Add Coupon'
        },

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AddcouponRoutingModule { }
