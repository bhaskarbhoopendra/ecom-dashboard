import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddlocationRoutingModule } from './addlocation-routing.module';
import { AddlocationComponent } from './addlocation.component';
import { EditlocationComponent } from '../editlocation/editlocation.component';
import { FormsModule } from '@angular/forms';





@NgModule({
    imports: [
        CommonModule,
        AddlocationRoutingModule,
        NgbModule,
        ChartistModule,
        FormsModule,


    ],
    exports: [],
    declarations: [
        AddlocationComponent,

    ],
    providers: [],
})
export class AddlocationModule { }
