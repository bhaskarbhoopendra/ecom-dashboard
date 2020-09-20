import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ChartistModule } from 'ng-chartist';
//import { DashboardRoutingModule } from "./dashboard-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { ResetPasswordComponent } from './reset-password.component';
import { resetPassRoutingmodule } from './reset-password-routing.module';
import { FormsModule } from '@angular/forms';
//import { resetPasswordRoutingmodule } from './reset-password-routing.module';
// import { OtpVerifyComponent } from './otp-verify.component';
// import { OtpRoutingmodule } from './otp-verify-routing.module';
//import { DashboardComponent } from './dashboard.component';





@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        resetPassRoutingmodule,
        ChartistModule,
        MatchHeightModule
        // resetPasswordRoutingmodule,
    ],
    exports: [],
    declarations: [
        ResetPasswordComponent,

    ],
    providers: [],
})
export class resetPassModule { }
