import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OtpVerifyComponent } from './otp-verify.component';

//import { DashboardComponent } from './dashboard.component';
//import { AuthGuard } from 'app/shared/auth/auth-guard.service';
const routes: Routes = [
    {
        path: '',
        component: OtpVerifyComponent,
        data: {
            title: 'otpverify'
        },

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OtpRoutingmodule { }
