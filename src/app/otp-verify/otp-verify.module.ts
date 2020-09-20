import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ChartistModule } from 'ng-chartist';
//import { DashboardRoutingModule } from "./dashboard-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { OtpVerifyComponent } from './otp-verify.component';
import { OtpRoutingmodule } from './otp-verify-routing.module';
import { FormsModule } from '@angular/forms';
//import { DashboardComponent } from './dashboard.component';





@NgModule({
    imports: [
        CommonModule,
        OtpRoutingmodule,
        NgbModule,
        FormsModule,
        ChartistModule,
        MatchHeightModule
    ],
    exports: [],
    declarations: [
        OtpVerifyComponent,

    ],
    providers: [],
})
export class OtpVerifyModule { }
