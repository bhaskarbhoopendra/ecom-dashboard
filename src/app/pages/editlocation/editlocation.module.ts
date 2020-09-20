import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditlocationRoutingModule } from './editlocation-routing.module';
import { EditlocationComponent } from './editlocation.component';
import { FormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        EditlocationRoutingModule,
        NgbModule,
        ChartistModule,
        FormsModule,

    ],
    exports: [],
    declarations: [
        EditlocationComponent,

    ],
    providers: [],
})
export class EditlocationModule { }
