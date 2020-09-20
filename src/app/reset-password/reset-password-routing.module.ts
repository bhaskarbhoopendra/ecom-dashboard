import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './reset-password.component';
//import { OtpVerifyComponent } from './otp-verify.component';

//import { DashboardComponent } from './dashboard.component';
//import { AuthGuard } from 'app/shared/auth/auth-guard.service';
const routes: Routes = [
    {
        path: '',
        component: ResetPasswordComponent,
        data: {
            title: 'resetpassword'
        },

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class resetPassRoutingmodule { }
