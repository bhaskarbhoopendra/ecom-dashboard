import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotpasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';



@NgModule({
    imports: [
        CommonModule,
        ForgotpasswordRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [
        ForgotPasswordComponent,

    ],
    providers: [],
})
export class ForgotpasswordModule { }
