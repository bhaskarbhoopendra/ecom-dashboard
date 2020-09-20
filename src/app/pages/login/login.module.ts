import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [
        LoginComponent,

    ],
    providers: [],
})
export class LoginModule { }
