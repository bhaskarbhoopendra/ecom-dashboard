import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';



@NgModule({
    imports: [
        CommonModule,
        RegisterRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [],
    declarations: [
        RegisterComponent,

    ],
    providers: [],
})
export class RegisterModule { }
